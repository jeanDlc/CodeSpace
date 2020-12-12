import React, { useContext } from 'react';
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
const BtnSeguir = ({idUsuario}) => {
    const {usuario}=useContext(FirebaseContext);
    const classes = useStyles();
    const seguir=async()=>{
        //verificar si el usuario ya está seguido
        if(listaIdSeguidos.includes(idUsuario)){
            dejarDeSeguir();
        }else{
            try {
                //seguir al usuario
                //aumentar el numSeguidores del usuario visitado
                await firebase.db.collection('usuarios').doc(idUsuario).update({
                    numSeguidores: firebase.fieldValue.increment(1)
                });
                //agregarlo a mi lista de seguidos
                await firebase.db.collection('usuarios').doc(uid).update({
                    listaIdSeguidos:[idUsuario, ...listaIdSeguidos]
                });
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
            //disminuir el numSeguidores del usuario visitado
            await firebase.db.collection('usuarios').doc(idUsuario).update({
                numSeguidores: firebase.fieldValue.increment(-1)
            });
            //removerlo de mi lista de seguidos
            await firebase.db.collection('usuarios').doc(uid).update({
                listaIdSeguidos:firebase.fieldValue.arrayRemove(idUsuario)
            });
            mostrarAlertas('Hecho', 'Dejaste de seguir esta persona', 'success');
        } catch (error) {
            console.log(error);
            mostrarAlertas('Error', 'Hubo un error, lo solucionaremos', 'error');
        }
    }
    //el usuario autenticado no puede seguirse a sí mismo:
    if(usuario===null || usuario.usuario.uid==idUsuario) return null;
    const {usuario:{uid}, data:{listaIdSeguidos}}=usuario;


    return (
        <Button 
            variant="contained" 
            className={classes.btnSeguir}
            onClick={seguir}
        >
            {listaIdSeguidos.includes(idUsuario)? 'Dejar de Seguir': 
                'Seguir'
            } <FavoriteIcon/>
        </Button>
    )
}
 
export default BtnSeguir;