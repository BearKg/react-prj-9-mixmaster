import axios from 'axios'
import { Link, useLoaderData, Navigate, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/CocktailPage'
import { useQuery } from '@tanstack/react-query'
const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const searchSingleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id || ''],
    queryFn: async () => {
      const response = await axios.get(`${singleCocktailUrl}${id}`)
      return response.data.drinks
    }
  }
}
export const loader = (queryClient) => async ({ params }) => {
  // parameter trong loader sẽ chứa thông tin params
  const { id } = params
  await queryClient.ensureQueryData(searchSingleCocktailQuery(id))
  // const { data } = await axios.get(`${singleCocktailUrl}${id}`)
  return {  id }
}

const Cocktail = () => {
   const navigate = useNavigate()
  const { id } = useLoaderData()
  const {data: drinks} = useQuery(searchSingleCocktailQuery(id))
  if(!drinks[0])
    return <Navigate to='/'/>
  const singleDrink = drinks[0]
  

  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    let currentIngredient = singleDrink[`strIngredient${i}`]
    if (currentIngredient) ingredients.push(currentIngredient)
  }

  const {
    strDrink: name,
    strDrinkThumb: image,
    strCategory: category,
    strAlcoholic: info,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink
  return (
    <Wrapper>
      <header>
        <button
          onClick={() => navigate(-1)}
          preventScrollReset={true}
          className="btn"
        >
          back home
        </button>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {ingredients.join(', ')}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}
export default Cocktail
