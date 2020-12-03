import React from 'react';
import Navbar from './Navbar';
import Head from 'next/head';
const Layout = props => {
    return ( 
        <>
            <Head></Head>
            <Navbar/>
            <main>
                {props.children}
            </main>
            
        </>
     );
}
 
export default Layout;