import React,{useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuMovil from './MenuMovil';
import Link from 'next/link';
import firebase,{FirebaseContext} from '../../firebase/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(0),
        color:'white',
        backgroundColor:'transparent',
        fontSize:'1.2rem',
        margin:'0'
      },
      '& button:hover': {
        background: "rgb(253, 91, 91)",
      }
    },
  }));


const Navbar = () => {
    const classes = useStyles();

    const {usuario}=useContext(FirebaseContext);

    return ( 
        <nav className="navbar">
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography
                component="div"
                />
                
                <div className="navbar-contenido">
                    <Link href="/">                        
                        <a>
                            <h1 className="tituloDeEscritorio">
                                Code<span>Space;</span>
                            </h1>
                        </a>
                    </Link>
                    
                    <h1 className="titulo-movil">
                        <Link href="/">                        
                            <a>
                                Cs;
                            </a>
                        </Link>
                    </h1>
                    <div className="buscador">
                        <input type="text" placeholder="Buscar algo.."/>
                        <div className="lupa">                            
                            &#x2315;
                        </div>
                    </div>                    
                    <div className="menuDeEscritorio">  
                        <Link href="/creadores">
                            <a>Creadores</a>
                        </Link>
                        {usuario? 
                            [
                                <Link key="nuevo-post" href="/nuevo-post">
                                    <a>&#x271a; Post</a>
                                </Link>,
                                <a key="mi-perfil" href="#">Mi Perfil</a>,
                                <div key="cerrar-sesion" className={classes.root}>                                    
                                    <Button variant="contained"
                                        onClick={()=>firebase.cerrarSesion()}
                                    >
                                        Cerrar sesión
                                    </Button>
                                </div>
                            ]
                        :
                            [
                                <Link key="login" href="/login">
                                    <a>Login</a>
                                </Link>,
                                <Link key="registro" href="/registro">
                                    <a>Registrarme</a>
                                </Link>
                            ]
                        }
                    </div>                    
                </div>
                <MenuMovil/>
            </Container>
               
            <style jsx>{`
                a{
                    color:var(--ligero);
                    font-weight:bold;
                    font-size:1.7rem;
                }
                a:hover{
                    color:white;
                }
                .navbar-contenido{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }
                
                .navbar{
                    background: rgb(53,136,163);
                    background: linear-gradient(90deg, rgba(53,136,163,1) 35%, rgba(132,94,194,1) 100%);
                    transition: all .3s ease-out;
                }
                .navbar:hover{                    
                    background: rgb(132,94,194);
                    background: linear-gradient(90deg, rgba(132,94,194,1) 35%, rgba(53,136,163,1) 100%);
                }
                .tituloDeEscritorio{
                    color:white;                                        
                    cursor:pointer;
                    display:none;
                    margin-top:1.5rem;
                    margin-bottom:1.5rem;
                    transition: all .3s ease-out;
                }
                .tituloDeEscritorio:hover{
                    color: #e5abf3;
                }
                .tituloDeEscritorio span{
                    font-weight:700;
                    color:white;
                }
                .titulo-movil{
                    margin-top:1.5rem;
                    margin-bottom:0;
                }
                .titulo-movil a{
                    color:var(--ligero);
                    font-weight:700;
                    font-size:5rem;                    
                }
                .buscador{
                    position:relative;
                }
                .lupa{
                    position:absolute;
                    right:1rem;
                    top:1rem;
                    font-size:1.5rem;
                    color:var(--colorPrincipal);
                }
                .menuDeEscritorio{
                    display:none;
                }
                @media(min-width:768px){                    
                    .menuDeEscritorio{
                        display:flex;
                        justify-content:space-between;
                        flex-basis: calc(50% - 1rem);
                    }
                    .tituloDeEscritorio{
                        display:block;
                    }
                    .titulo-movil{
                        display:none;
                    }
                }
                .buscador input:focus{
                    border:2px solid #e5abf3;
                }
                @media(max-width:768px){
                    .buscador{
                        flex: 1 0 calc(70% - 1rem);
                        
                    }
                    .buscador input{
                        width:95%;
                        margin-left:1.5rem;
                    }
                    
                }
            `}</style>      
        </nav>
        
     );
}
 
export default Navbar;