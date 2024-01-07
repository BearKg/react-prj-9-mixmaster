import { useRouteError } from 'react-router-dom'
const SingleErrorPage = () => {
  const error = useRouteError()
  return <h2>{error.message}</h2>
}
export default SingleErrorPage
