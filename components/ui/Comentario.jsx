import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
    usuario: {
        display:'flex',
        alignItems:'center',
        '& p':{
            marginLeft:'1rem'
        }
    },
  }));
const Comentario = ({comentario}) => {
    const classes = useStyles();
    return ( 
        <li className={classes.liComentario}>
            <div className={classes.usuario}>
                <Avatar alt="foto" src={comentario.fotoUsuario} />
                <p>{comentario.nombreUsuario} {comentario.apellidoUsuario} </p>
            </div>
            <div>
                <p>{comentario.mensaje} </p>
            </div>
        </li>
     );
}
 
export default Comentario;