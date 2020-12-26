import React, {useContext} from 'react';
import Link from 'next/link';
import firebase,{ FirebaseContext } from '../../firebase';
import Buscador from '../ui/Buscador';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
/**Estilos************************************************ */
const useStyles = makeStyles((theme) => ({
    contenedor: {
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      padding:'0 1.5rem',
      '& a':{
          color:'var(--ligero)',
          fontWeight:'bold',
          '&:hover':{
              color:'white'
          }
      }
    },
    logo:{
        fontSize:'4rem',
        fontFamily:'var(--fuentePrincipal)',
        marginTop:'0',
        marginBottom:'0',
        color:'white',
        transition:'all .3s ease-out',
        '& h1':{
            marginTop:'1.8rem',
            marginBottom:'1.8rem',
            color:'white'
        },
        '& span':{
            transition:'all .3s ease-out',
            fontWeight:'bold',
        },
        '& span:hover':{
            color: '#e5abf3'
        },
        
        
    },
    btnCerrarSesion:{
        '& button':{
            backgroundColor:'transparent',
            color:'white',
            fontSize:'1.2rem',
            '&:hover':{
                backgroundColor:'var(--danger)'
            }
        }
    }
}));
/**Menu ************************************************** */
const MenuDesktop = () => {
    const classes = useStyles();
    const {usuario}= useContext(FirebaseContext);
    const router = useRouter();
    const cerrarSesion=()=>{        
        firebase.cerrarSesion();
        router.push('/login');
    }
    return ( 
        <div className={classes.contenedor} >
            <Link href="/">
                <a  className= {classes.logo}> 
                    <h1>
                        Code<span>Space;</span>
                    </h1>
                </a>
            </Link>
            <Buscador/>
            <Link href="/creadores">
                <a>Creadores</a>
            </Link>
            {usuario? 
                [
                    <Link key="nuevo-post" href="/nuevo-post">
                        <a>&#x271a; Post</a>
                    </Link>,
                    <Link href={`/usuario/${usuario.usuario.uid}`} key="mi-perfil">
                        <a>Mi Perfil</a>
                    </Link>,
                    <div key="cerrar-sesion" className={classes.btnCerrarSesion} >                                    
                        <Button variant="contained"
                            onClick={cerrarSesion}
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
     );
}
 
export default MenuDesktop;