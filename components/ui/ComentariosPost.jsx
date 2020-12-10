import React, {useEffect, useContext} from 'react';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import useValidacion from '../../hooks/useValidacion';
import validarComentario from '../../validation/validarComentario';
import firebase,{FirebaseContext} from '../../firebase/index';
import alertas from '../../alertas';
import Comentario from './Comentario';
const useStyles = makeStyles((theme) => ({
    envioComentario: {
        display:'flex',
        alignItems:'center',
      '& input':{
          border:'1px solid #e1e1e1',
          width:'100%',
      }
    },
    listaComentarios: {
        listStyle:'none',
        padding:0
    },
    comentario:{}
  }));

const ComentariosPost = ({idPost, comentarios}) => {    
    const {usuario}=useContext(FirebaseContext);
    
    const STATE_INICIAL={
        comentario:''
    }
    const enviarComentario=async()=>{
        console.log('enviar comentario');
        try {
            const miComentario={
                idUsuario:usuario.usuario.uid,
                nombreUsuario: usuario.data.nombre,
                apellidoUsuario: usuario.data.apellido,
                fotoUsuario: usuario.data.urlFotoPerfil,
                mensaje: comentario
            }
            await firebase.db.collection('posts').doc(idPost).update({
                comentarios: [...comentarios, miComentario]
            })
        } catch (error) {
            console.log(error);
            alertas('Error','No se pudo enviar tu comentario','error');
        }
    }
    const {
        errores,
        valores,
        submitForm,
        handleChange,
        handleSubmit,
    }=useValidacion(STATE_INICIAL, validarComentario, enviarComentario);
    const {comentario}=valores;
    const classes = useStyles();
    
    useEffect(()=>{
        if(Object.keys(errores).length>0){
            alertas('Error','Hubo un error','error');
        }
    },[errores]);
    return ( 
        <div >
            <form className={classes.envioComentario} onSubmit={handleSubmit}>
                <input type="text"
                    onChange={handleChange}
                    name="comentario"
                />
                <SendIcon style={{ 
                    flexBasis:'3rem',
                    fontSize:'2rem',
                    '&:hover':{
                        color:'var(--colorPrincipal)',
                        cursor:'pointer'
                    }
                }} />
            </form>
            <ul className={classes.listaComentarios}>
                {comentarios.map((comentario,i)=>(
                    <Comentario 
                        key={`${i}-${comentario.idUsuario}`}
                        comentario={comentario} />
                ))}
            </ul>
        </div>
     );
}
 
export default ComentariosPost;