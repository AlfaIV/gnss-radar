import React from 'react';
import Header from '@components/header/header'
import Footer from '@components/footer/footer'
import style from './layout.module.scss'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return(
        <div className={style.app}>
            <Header/>
            <div className={style.body}>{children}</div>
            <Footer/>
        </div>
    )
};

export default Layout;