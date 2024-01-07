import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'
const cocktailSearchUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
import { useQuery } from '@tanstack/react-query'

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
      return response.data.drinks
    },
  }
}
// khi submit mặc định form sẽ request với method get và query sẽ là search=...
export const loader = (queryClient) => async ({ request }) => {
  console.log(request);
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get('search') || ''
  // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm)) // tải sẵn dữ liệu vào bộ nhớ
  return { searchTerm }
} // loader get data before render

const Landing = () => {
  const { searchTerm } = useLoaderData()
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm))
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  )
}
export default Landing

// queryClient.ensureQueryData(...): Phương thức này của React Query được sử dụng để đảm bảo rằng dữ liệu của một truy vấn đã được tải và có sẵn trong bộ nhớ cache. Nếu dữ liệu chưa có, nó sẽ kích thích việc thực hiện truy vấn và đợi cho đến khi dữ liệu được tải xong trước khi tiếp tục. Nếu dữ liệu đã có sẵn, không có truy vấn mới được thực hiện.