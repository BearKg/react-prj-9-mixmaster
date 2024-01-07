import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Landing,
  About,
  Cocktail,
  Newsletter,
  HomeLayout,
  Error,
  SingleErrorPage,
} from './pages/index'
import { loader as landingLoader } from './pages/Landing'
import { loader as singleCocktailLoader } from './pages/Cocktail'
import { action as newsletterAction } from './pages/Newsletter'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, // khi xảy ra lỗi thay vì render element, nó sẽ render errorElement
    children: [
      {
        index: true, // mặc định HomeLayout sẽ render component này
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <SingleErrorPage />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'cocktail/:id', // thêm param để trỏ đế từng loại cocktail
        element: <Cocktail />,
        errorElement: <SingleErrorPage />,
        loader: singleCocktailLoader(queryClient),
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: 'error',
        element: <Error />,
      },
    ],
  },
])
// cần phải nest pages để có thể hiện element chung như navbar hay footer bằng cách đưa nó vào parent component

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
