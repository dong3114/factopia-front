import { createBrowserRouter, Outlet } from "react-router-dom"
import DefaultLayout from "../member/pages/defaultLayout/DefaultLayout"
import MemberRegister from "../member/pages/member/Index"
import FactoryPage from "../member/pages/factory/FactoryDefault"
import FactoryLayout from "../member/pages/factory/FactoryLayout"
import FactorySitePage from "../member/pages/factory/FactorySitePage"
import FactoryZonePage from "../member/pages/factory/FactoryZonePage"
import FactorySectionPage from "../member/pages/factory/FactorySectionPage"


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
    // 일반 회원 페이지
    children: [
      // 홈페이지
      { path: "/", element: <div /> },
      // 회원가입 페이지
      { path: "/register", element: <MemberRegister />},

      // 3D 모델 생성
      { path: "/factory" ,
        element: <FactoryLayout />,
        children: [
          { path: "creator", element: <FactoryPage /> }, 
          { path: "creator/factory_site", element: <FactorySitePage /> }, 
          { path: "creator/factory_zone", element: <FactoryZonePage /> }, 
          { path: "creator/factory_section", element: <FactorySectionPage /> }, 
        ],
      },


    ]
  },
])