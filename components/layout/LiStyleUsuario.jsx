import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link';
/**Estilos de material ui*************************************** */
const useStyles = makeStyles(() => ({
    liUsuario: {
      backgroundColor:'white',
      padding:'1rem',
      marginBottom:'1.2rem',
      display:'flex',
      alignItems:'flex-start',
      borderRadius:'1rem'
    },
    info:{
      marginLeft:'1rem',
      '& p':{
        margin:0,
      }
    },
    email:{
      color:'var(--dark)',
      
    },
    nombre:{
      fontWeight:'bold',
      fontSize:'1.8rem',
      color:'var(--dark)',
      transition:'all .3s ease-out',
      '&:hover':{
        color:'var(--colorSecundario)'
      }
    },
    numSeguidores:{
      color:'var(--colorSecundario)',
      fontSize:'1.3rem'
    }
  }));
const LiStyleUsuario = ({usuario}) => {
    const classes = useStyles();
  
    return ( 
        <li className={classes.liUsuario}> 
            <Avatar alt="usuario foto" src={usuario.urlFotoPerfil} />
            <div className={classes.info} >
                <Link href={`/usuario/${usuario.idAuth}`}>
                <a className={classes.nombre}>{usuario.nombre} {usuario.apellido}</a>
                </Link>
                <p className={classes.email} >{usuario.email}</p>
                <p className={classes.numSeguidores} >{usuario.idUserSeguidores.length} seguidores <FavoriteIcon/></p> 
            </div>
        </li>
     );
}
 
export default LiStyleUsuario;