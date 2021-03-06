import React from 'react';
import Navbar from './Navbar';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
const Layout = props => {
    return ( 
        <>
            <Head>
                <title>CodeSpace</title>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Teko:wght@500;700&display=swap" rel="stylesheet"/>                 
            </Head>
            <CssBaseline />
            <Navbar/>
            <main>
                {props.children}

            </main>
            
        </>
     );
}
 
export default Layout;