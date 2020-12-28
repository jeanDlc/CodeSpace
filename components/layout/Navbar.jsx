import React from 'react';
import Container from '@material-ui/core/Container';
import MenuMovil from './MenuMovil';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuDesktop from './MenuDesktop';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
/**Funciones que ocultan muestran u ocultan el NAVBAR cuando el user da scroll */
function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  /**Estilos************************************************************ */
  const useStyles = makeStyles({
    navbar: {
      backgroundColor: 'var(--colorPrincipal)',
      background:'linear-gradient(90deg, rgba(53,136,163,1) 35%, rgba(132,94,194,1) 100%)',
      borderBottom:'2px solid white',
      '&:hover':{
        background:'var(--colorSecundario)',
        background:'linear-gradient(90deg, rgba(132,94,194,1) 35%, rgba(53,136,163,1) 100%)'
      }
    },
  });
  /**Componente principal******************************************************* */
const Navbar = (props) => {
    //estilos
    const classes = useStyles();
    
    //el media query para mostrar el menu de escritorio o el de móvil
    const bigScreen = useMediaQuery('(min-width:920px)');
    
    return ( 
        <>
            <HideOnScroll {...props}>
                    <AppBar className={classes.navbar} >
                        <Toolbar>
                            <Container>
                                {bigScreen? 
                                    <MenuDesktop/>
                                    : 
                                    <MenuMovil/>
                                }
                            </Container>
                        </Toolbar>
                    </AppBar>
                    
            </HideOnScroll>
            <Toolbar />
            {bigScreen? null: <Toolbar />}
        </>
        
     );
}
 
export default Navbar;