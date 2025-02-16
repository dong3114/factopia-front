import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function FactoryDashboard(){
  const [ factories, setFactories ] = useState([]);
  const navigate = useNavigate();

  const memberNo = sessionStorage.getItem("M000002");

  const handleCreateFactory = (data) => {

  }

  // TO DO 회원 E_NO를 받아와서 대시보드 형태로 관리


}