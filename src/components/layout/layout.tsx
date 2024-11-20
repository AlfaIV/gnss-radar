import { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/header/header";
import Footer from "@components/footer/footer";

import style from "./layout.module.scss";

import { authCheck } from "@utils/requests/requests";
import { useQuery } from "react-query";

const Layout:FC = () => {
  const auth = useQuery("authCheck", authCheck);
  console.log(auth.data);
  return (
    <div className={style.app}>
      <Header />
      <div className={style.body}>
        <Outlet />
        {/* {children} */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
