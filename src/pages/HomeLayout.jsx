import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomeLayout = () => {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? (<div className="loading" />) : (<Outlet />)}
        {/* Cần phải có Outlet để có thể render các component con */}
      </section>
    </>
  )
}
export default HomeLayout
