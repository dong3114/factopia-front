import { createBrowserRouter, Outlet } from "react-router-dom"
import DefaultLayout from "../member/pages/defaultLayout/DefaultLayout"


const RouterComponent = () => {
  return (
  <DefaultLayout>
    <Outlet/>
  </DefaultLayout>
  )
}

export default createBrowserRouter([
  {
    element: <RouterComponent />,
    children: [
      // 홈페이지
      { path: "/", element: <div /> },
    ]
  },
])