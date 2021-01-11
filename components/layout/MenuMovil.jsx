import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link'
import firebase,{FirebaseContext} from '../../firebase/index';
import { makeStyles } from '@material-ui/core/styles';
import Buscador from '../ui/Buscador';
import { useRouter } from 'next/router';
import ModalSeguidores from './ModalSeguidores';
import ModalSeguidos from './ModalSeguidos';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
/**Estilos**************************************************** */
const useStyles = makeStyles((theme) => ({
    contenedorMenu:{
        textAlign:'center',
        paddingBottom:'2rem',
    },
    subContenedor: {
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      '& a':{
          flexBasis:'calc(10% - 1.5rem)',
          marginRight:'1rem'

      },
      '& form':{
        flexBasis:'calc(90% - 1.5rem)',
        '& input':{
            width:'100%'
        }
      }
    },
    logo:{
        color:'white',
        '& h1':{
            color:'white',
            fontSize:'4.5rem',
            marginBottom:'1rem',
            marginTop:'1rem',
            fontWeight:'bold'
        }
    },
    menu:{
        textAlign:'center', 
        '& a':{
            color:'#444444e0',
            fontSize:'1.7rem',
            display:'block',
            width:'100%',
            textAlign:'center',
            
            padding:'1rem',
            backgroundColor:'white'
        },
        '& button':{
            fontSize:'1.5rem',
        },
        '& div':{
            width:'100%',
            backgroundColor:'#444444e0',
        }
    },
    white:{
        color:"white"
    },
}));
const MenuMovil = () => {
    const router=useRouter();
    const classes = useStyles();
    const {usuario}=useContext(FirebaseContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return ( 
        <div className={classes.contenedorMenu}>
            <div className={classes.subContenedor} >
                <Link href='/'>
                    <a className={classes.logo}>
                        <h1 >Cs;</h1>
                    </a>
                </Link>
                <Buscador/>
            </div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                style={{
                    fontSize: '2rem',
                    fontWeight:'bold',
                    color:'white'
                }}
            >
                &#9776;
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
            >   
                <MenuItem onClick={handleClose}
                >
                    <Link href="/">
                        <a><HomeIcon/> Home</a>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}
                >
                    <Link href="/creadores">
                        <a><PeopleIcon/> Creadores</a>
                    </Link>
                </MenuItem>
                
            {usuario? (
                [
                    <MenuItem key="mi-perfil-movil" onClick={handleClose}
                    >
                        <Link href={`/usuario/${usuario.usuario.uid}`}>
                            <a><PersonIcon/> Mi perfil</a>
                        </Link>
                    </MenuItem>,
                    <MenuItem key="nuevo-post-movil" onClick={handleClose}
                    >
                        <Link href="/nuevo-post">
                            <a>&#x271a; Post</a>
                        </Link>
                    </MenuItem>,
                    <MenuItem key="seguidores" onClick={handleClose}
                    >
                        <ModalSeguidores/>
                    </MenuItem>,
                    <MenuItem key="seguidos" onClick={handleClose}
                    >
                        <ModalSeguidos/>
                    </MenuItem>,
                    <MenuItem key="cerrar-sesion-movil" onClick={()=>{
                        handleClose();
                        firebase.cerrarSesion();
                        router.push('/login');
                    }}
                        style={{
                            fontSize: '1.7rem',
                            backgroundColor:'var(--danger)',
                            color:'white',
                            textAlign:'center',
                            display:'block',
                            margin:'1rem 1.5rem'
                        }}
                    >
                        Cerrar sesión
                    </MenuItem>
                ]
            ): (
                [
                    <MenuItem key="login-movil" onClick={handleClose}
                    >
                        <Link href="/login">
                            <a>Iniciar sesión</a>
                        </Link>
                    </MenuItem>,
                    <MenuItem key="registro-movil" onClick={handleClose}
                        style={{
                            backgroundColor:'var(--colorPrincipal)'
                        }}
                    >
                        <Link href="/registro">
                            <a className={classes.white} >Registrarme</a>
                        </Link>
                    </MenuItem>
                ]
            )}
            </Menu>
        </div>   
     );
}
 
export default MenuMovil;