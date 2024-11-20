import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "@components/header/header";
import Footer from "@components/footer/footer";

import style from "./layout.module.scss";

import { authCheck } from "@utils/requests/requests";
import { useQuery } from "react-query";

import { useNavigate } from 'react-router-dom';


const Layout:FC = () => {
  const auth = useQuery("authCheck", authCheck, {
    // cacheTime: 0,
    // staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    onSuccess: () => {
      // fix it на проде раскомментировать 
      console.log("auth.data",auth.data);
      if (!auth.data) {
        navigate('/login');
      } else {
        navigate('/measure');
      }
    },
  });
  const navigate = useNavigate();



  return (
    <div className={style.app}>
      <Header />
      <div className={style.body}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
