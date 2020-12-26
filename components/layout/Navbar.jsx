import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MenuMovil from './MenuMovil';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuDesktop from './MenuDesktop';

const Navbar = () => {
    const bigScreen = useMediaQuery('(min-width:920px)');
    
    
    return ( 
        <nav className="navbar">
            <CssBaseline />
            <Container maxWidth="lg">
                {bigScreen? 
                    <MenuDesktop/>
                    : 
                    <MenuMovil/>
                }
            </Container>
               
            <style jsx>{`
                .navbar{
                    background: rgb(53,136,163);
                    background: linear-gradient(90deg, rgba(53,136,163,1) 35%, rgba(132,94,194,1) 100%);
                    transition: all .3s ease-out;
                    border-bottom: 2px solid white;
                
                }
                .navbar:hover{                    
                    background: rgb(132,94,194);
                    background: linear-gradient(90deg, rgba(132,94,194,1) 35%, rgba(53,136,163,1) 100%);
                }
            `}</style>      
        </nav>
        
     );
}
 
export default Navbar;