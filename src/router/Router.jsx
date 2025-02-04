import { createBrowserRouter, Outlet } from "react-router-dom"
import DefaultLayout from "../member/pages/defaultLayout/DefaultLayout"
import MemberRegister from "../member/pages/member/Index"


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
      // 회원가입 페이지
      { path: "/register", element: <MemberRegister />}
    ]
  },
])