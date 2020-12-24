import React, {useEffect, useContext, useState} from 'react';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import useValidacion from '../../hooks/useValidacion';
import validarComentario from '../../validation/validarComentario';
import firebase,{FirebaseContext} from '../../firebase/index';
import alertas from '../../alertas';
import Comentario from './Comentario';
import Button from '@material-ui/core/Button';
/**Estilos de material ui******************************************* */
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
    btnVerComentario:{
        margin: '1.3rem 0',
    }
  }));
/**Componente principal************************************************** */
const ComentariosPost = ({idPost, comentarios}) => {

    //decide si mostrar o no los comentarios
    const [verComentarios, setVerComentarios]=useState(false);

    const {usuario}=useContext(FirebaseContext);
    
    //state inicial para el hook personalizado: useValidacion
    const STATE_INICIAL={
        comentario:''
    }
    //envia comentario a firebase
    const enviarComentario=async()=>{
        try {
            const miComentario={
                idUsuario:usuario.usuario.uid,
                nombreUsuario: usuario.data.nombre,
                apellidoUsuario: usuario.data.apellido,
                fotoUsuario: usuario.data.urlFotoPerfil,
                mensaje: comentario
            }
            await firebase.db.collection('posts').doc(idPost).update({
                comentarios: [ miComentario , ...comentarios ]
            })
            setVerComentarios(true);
        } catch (error) {
            console.log(error);
            alertas('Error','No se pudo enviar tu comentario','error');
        }
    }

    //hook personalizado que valida los inputs de los formularios
    const {
        errores,
        valores,
        handleChange,
        handleSubmit,
    }=useValidacion(STATE_INICIAL, validarComentario, enviarComentario);
    const {comentario}=valores;

    //clases de material ui
    const classes = useStyles();
    
    //cada vez que hay un error de useValidacion, se dispara una alerta
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
                    placeholder="Escribe un comentario"
                />
                <SendIcon onClick={handleSubmit} style={{ 
                    flexBasis:'3rem',
                    fontSize:'2rem',
                    cursor:'pointer',
                    '&:hover':{
                        color:'var(--colorPrincipal)',
                        cursor:'pointer'
                    }
                }} />
            </form>
            <Button 
                color="primary"
                variant="contained"
                className={classes.btnVerComentario}
                onClick={()=>{setVerComentarios(!verComentarios)}} >
                {comentarios.length} comentarios
            </Button>
            {verComentarios && (
                <ul className={classes.listaComentarios}>
                    {comentarios.map((comentario,i)=>(
                        <Comentario 
                            key={`${i}-${comentario.idUsuario}`}
                            comentario={comentario} />
                    ))}
                </ul>
            )}
        </div>
     );
}
 
export default ComentariosPost;