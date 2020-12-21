import React,{useContext} from 'react';
import Paper from '@material-ui/core/Paper';
import {FirebaseContext} from '../../firebase/index';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign:'center'
    },
    avatar:{
      display:'flex',
      alignItems:'center',
      '& p':{
        marginLeft:'2rem'
      }
    },
    sidebar:{
      marginTop:'1rem'
    }
  }));
const Sidebar = () => {
    const classes = useStyles();
    const {usuario}=useContext(FirebaseContext);
    return ( 
        <aside className={classes.sidebar} >
            <Paper className={classes.paper}>
                {usuario && usuario.data.urlFotoPerfil && usuario.data.nombre!==null  ? 
                <div className={classes.avatar}>
                    <Avatar alt="Foto de perfil" src={usuario.data.urlFotoPerfil} />
                    <p>Bienvenido {usuario.data.nombre} </p>
                </div>
                : null
                }
                {!usuario?
                <Link href="/login">
                    <a>Inicia sesión</a>
                </Link>
                : null
                }
            </Paper>
        </aside>
     );
}
 
export default Sidebar;