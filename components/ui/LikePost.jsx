import React,{useState, useContext,useEffect} from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { makeStyles } from '@material-ui/core/styles';
import firebase, {FirebaseContext} from '../../firebase/index';
import mostrarAlertas from '../../alertas';
const LikePost = ({idPost,idUserLikes}) => { 
    const {usuario}=useContext(FirebaseContext);
    const [colorLike, setColorLike]=useState("var(--dark)");
    
    
    const useStyles = makeStyles((theme) => ({
        icono:{
            color:colorLike,
            marginTop:'1rem',
            cursor:'pointer',
            display:'flex',
            alignItems:'center',
            '& svg:hover':{
                color:'var(--colorSecundario)'
            }
        },
        cantLikes:{
            color:'var(--dark)',
            fontSize:'2rem',
            marginRight:'1rem',
            fontWeight:'bold'
        }
      }));
    const classes = useStyles();
    const like=()=>{
        if(!usuario){
            mostrarAlertas('Inicia sesión', 'Para poder dar like, debes iniciar sesión primero', 'info');
            return;
        };
        if(idUserLikes.includes(usuario.usuario.uid)){
            desmarcarComoFavorito();
        }else{
            marcarComoFavorito();
        }
    }
    useEffect(()=>{
        if(usuario && idUserLikes.includes(usuario.usuario.uid)){
            setColorLike("var(--colorSecundario)");
        }else{
            setColorLike("var(--dark)");
        }
    },[idUserLikes, usuario]);
    const marcarComoFavorito=async()=>{
        console.log('marcando como favorito');
        try {
            await firebase.db.collection('posts').doc(idPost).update({
                idUserLikes:firebase.fieldValue.arrayUnion(usuario.usuario.uid)
            });
            
        } catch (error) {
            console.log(error);
        }

    }

    const desmarcarComoFavorito=async()=>{
        console.log('desmarcando');
        try {
            await firebase.db.collection('posts').doc(idPost).update({
                idUserLikes:firebase.fieldValue.arrayRemove(usuario.usuario.uid)
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    //if(!usuario) return null;
    return ( 
        <div className={classes.icono} >
            <span className={classes.cantLikes} >{idUserLikes.length}</span>
            <ThumbUpAltIcon onClick={like}  style={{ 
                fontSize: '2.5rem',
                transition:'all .3s ease-out',
            }}/>
        </div>
     );
}
 
export default LikePost;
