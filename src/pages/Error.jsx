import {Link, useRouteError} from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/not-found.svg'
const Error = () => {
  const error = useRouteError() // khi errorElement dc render thì nó sẽ hàm này sẽ trã về mọi thông tin lỗi dưới dạng object
  console.log(error)
  if(error.status === 404)
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh...!</h3>
          <p>We can't seem to find page you looking for</p>
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    )
  return (
    <div>Error</div>
  )
}
export default Error