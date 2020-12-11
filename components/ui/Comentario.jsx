import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
/**Estilos de material ui***************************************** */
const useStyles = makeStyles((theme) => ({
    liComentario:{
        marginBottom:'1rem'
    },
    usuario: {
        display:'flex',
        alignItems:'flex-start',
        '& p':{
            marginLeft:'1rem'
        }
    },
    nombreUser:{
        marginTop:0,
        fontSize:'1.4rem',
        marginBottom:0,
        fontWeight:'bold'
        
    },
    infoUsuario:{
        border:'1px solid #e1e1e1',
        backgroundColor:'#e1e1e1',
        borderRadius:'1rem',
        padding:'1rem',
        marginLeft:'1rem',
        
    },
    mensaje:{
        marginBottom:'1rem',
        fontSize:'1.7rem',
        marginTop:0
    }
  }));
  /**Componente Comentario principal************************************** */
const Comentario = ({comentario}) => {
    //le llega como prop el objeto comentario con toda la info del comentario
    const classes = useStyles();
    return ( 
        <li className={classes.liComentario}>
            <div className={classes.usuario}>
                <Avatar alt="foto" src={comentario.fotoUsuario} />                
                <div className={classes.infoUsuario} >
                    <p className={classes.nombreUser}>
                        {comentario.nombreUsuario} {comentario.apellidoUsuario} 
                    </p>
                    <p className={classes.mensaje}>
                        {comentario.mensaje} 
                    </p>                    
                </div>
            </div>
            
        </li>
     );
}
 
export default Comentario;