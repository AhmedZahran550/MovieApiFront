import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';
import Nav from './../Nav/Nav';

const Layout = () => {

    return (
        <>
            <Nav  />
            <div className="container">
                <Outlet></Outlet>

            </div>

            <Footer />
        </>
    );
};

export default Layout;
