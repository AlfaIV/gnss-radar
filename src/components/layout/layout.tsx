import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";

import style from "./layout.module.scss";

import { authCheck } from "~/utils/requests/requests";
import { useQuery } from "react-query";

import { useNavigate } from "react-router-dom";

const Layout: FC = () => {
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';

  const auth = useQuery("authCheck", authCheck, {
    // cacheTime: 0,
    // staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      if(isLocalhost){
        return
      }
      if (!data) {
        navigate("/login");
      } else {
        navigate("/state");
      }
    },
  });
  const navigate = useNavigate();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Ошибка при проверке аутентификации</div>;
  }

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
