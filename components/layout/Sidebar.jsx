import React,{useContext} from 'react';
import Paper from '@material-ui/core/Paper';
import {FirebaseContext} from '../../firebase/index';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import ModalSeguidos from './ModalSeguidos';
import ModalSeguidores from './ModalSeguidores';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useRouter } from 'next/router';
/**Estilos************************************************** */
const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign:'center'
    },
    avatar:{
      color:'var(--dark)',
      fontWeight:'bold',
      display:'flex',
      alignItems:'center',
      '& a':{
        marginLeft:'1.5rem',
        color:'var(--dark)',
        fontSize:'1.6rem'
      }
    },
    sidebar:{
      marginTop:'1rem'
    },
    contenedorElemento:{
      margin:'1rem 0',
      '& button':{
        fontSize:'1.2rem'
      }
    }
  }));
  /**Componente ********************************************* */
const Sidebar = () => {
    const classes = useStyles();
    const {usuario}=useContext(FirebaseContext);
    const router=useRouter();
    
    if(!usuario) return (<aside>
          <Paper className={classes.paper}>
              <Link href="/login">
                  <a>Inicia sesión</a>
              </Link>
          </Paper>
      </aside>)
    return ( 
        <aside className={classes.sidebar} >
            <Paper className={classes.paper}>
              <div className={classes.avatar}>
                  <Avatar alt="Foto de perfil" src={usuario.data.urlFotoPerfil} />
                  <Link href={`/usuario/${usuario.usuario.uid}`}>
                      <a>Bienvenido {usuario.data.nombre}</a>
                  </Link>
              </div>
              <div className={classes.contenedorElemento}>
                  <Button
                      color="secondary"
                      variant="outlined"
                      fullWidth={true} 
                      type="button" 
                      onClick={()=>{router.push('/posts-favoritos')}}
                  >
                      Mis posts favoritos  <FavoriteIcon/>
                  </Button>
              </div>
              <div className={classes.contenedorElemento} >
                <ModalSeguidores/>
              </div>
              <div className={classes.contenedorElemento} >
                <ModalSeguidos/>
              </div>
            </Paper>
        </aside>
     );
}
 
export default Sidebar;