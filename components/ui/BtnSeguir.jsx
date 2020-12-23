import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import firebase,{FirebaseContext} from '../../firebase/index';
import mostrarAlertas from '../../alertas';
const useStyles = makeStyles((theme) => ({
    
    btnSeguir:{
        width:'100%',
        backgroundColor:'var(--colorSecundario)',
        fontSize:'1.4rem',
        color:'white',
        '&:hover':{
            backgroundColor:'var(--colorPrincipal)'
        },
        
    },
  }));
const BtnSeguir = ({idUsuario,usuarioBuscado}) => {
    const [btnText, setBtnText]=useState('Dejar de Seguir');
    //usuario actual
    const {usuario}=useContext(FirebaseContext);

    //estilos
    const classes = useStyles();

    //seguir a otro usuario
    const seguir=async()=>{
        //verificar si el usuario ya está seguido
        if(usuarioBuscado.idUserSeguidores.includes(uid)){
            dejarDeSeguir();
        }else{
            try {
                //seguir al usuario
                //agregar al usuario actual como uno de los seguidores del otro usuario
                await firebase.db.collection('usuarios').doc(idUsuario).update({
                    idUserSeguidores:firebase.fieldValue.arrayUnion(uid)
                });
                //actualizar los "seguidos" del usuario actual
                await firebase.db.collection('usuarios').doc(uid).update({
                    idUserSeguidos:firebase.fieldValue.arrayUnion(idUsuario)
                });
                setBtnText('Dejar se seguir');
                mostrarAlertas('Seguido', 'Ahora eres seguidor de esta persona', 'success');
            } catch (error) {
                console.log(error);
                mostrarAlertas('Error', 'No se pudo seguir a ese creador', 'error');
            }
        }
    }

    const dejarDeSeguir=async()=>{
        try {
            //dejar de seguir al usuario
            //remover al usuario actual como uno de los seguidores del otro usuario
            await firebase.db.collection('usuarios').doc(idUsuario).update({
                idUserSeguidores:firebase.fieldValue.arrayRemove(uid)
            });
            //actualizar los "seguidos" del usuario actual
            await firebase.db.collection('usuarios').doc(uid).update({
                idUserSeguidos:firebase.fieldValue.arrayRemove(idUsuario)
            });
            mostrarAlertas('Hecho', 'Dejaste de seguir esta persona', 'success');
            setBtnText('Seguir');
        } catch (error) {
            console.log(error);
            mostrarAlertas('Error', 'Hubo un error, lo solucionaremos', 'error');
        }
    }
    useEffect(()=>{
        
        if(usuarioBuscado && usuario){
            if(usuarioBuscado.idUserSeguidores.includes(uid)){
                setBtnText('Dejar de seguir');
            }else{
                setBtnText('Seguir');
            }
        }
    },[usuarioBuscado, usuario]);
    //el usuario autenticado no puede seguirse a sí mismo:
    if(usuario===null || usuario.usuario.uid==idUsuario) return null;
    //información del usuario actual
    const {usuario:{uid}}=usuario;

    

    return (
        <Button 
            variant="contained" 
            className={classes.btnSeguir}
            onClick={seguir}
        >
            {btnText} <FavoriteIcon/>
        </Button>
    )
}
 
export default BtnSeguir;