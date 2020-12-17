import React,{useState, useContext,useEffect} from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { makeStyles } from '@material-ui/core/styles';
import firebase, {FirebaseContext} from '../../firebase/index';

const LikePost = ({idPost,numLikes}) => { 
    const {usuario}=useContext(FirebaseContext);
    const [permitirLike,setPermitirLike]=useState(false);
    const [listaPostFavoritos,setListaPostFavoritos]=useState([]);
    const [colorLike, setColorLike]=useState("#444");
    useEffect(()=>{
        let desmontado=false;
        if(usuario && desmontado===false){
            
            setListaPostFavoritos(usuario.data.listaIdPostFavoritos);
            
        }
        return ()=>{
            console.log('desmontando desde likePost');
            desmontado=true;
        }
    },[usuario]);
   
    useEffect(()=>{
        let desmontado=false;
        if(permitirLike && desmontado===false){//para evitar que se ejecute más veces de la necesaria
            const cambiarPreferencia=async()=>{
                try {
                    await firebase.db.collection('usuarios').doc(usuario.usuario.uid).update({
                        listaIdPostFavoritos:listaPostFavoritos
                    });
                } catch (error) {
                    console.log(error); 
                }
            }
            cambiarPreferencia();
        }
        return ()=>{
            console.log('desmontando desde likePost 2');
            desmontado=true;
        }
    },[listaPostFavoritos]);
    
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
            color:'#444',
            fontSize:'2rem',
            marginRight:'1rem',
            fontWeight:'bold'
        }
      }));
    const classes = useStyles();
    const like=()=>{
        setPermitirLike(true);
        if(listaPostFavoritos.includes(idPost)){
            desmarcarComoFavorito();
        }else{
            marcarComoFavorito();
        }
    }
    const marcarComoFavorito=async()=>{

        try {
            await firebase.db.collection('posts').doc(idPost).update({
                numLikes:numLikes+1
            });
            setListaPostFavoritos([
                ...listaPostFavoritos,
                idPost
            ]);
            setColorLike("var(--colorSecundario)");
            
        } catch (error) {
            console.log(error);
        }

    }

    const desmarcarComoFavorito=async()=>{
        console.log('desmarcando');
        try {
            await firebase.db.collection('posts').doc(idPost).update({
                numLikes:numLikes-1
            });
            const quitarPost=listaPostFavoritos.filter(id=>id!==idPost);
            setListaPostFavoritos(quitarPost);
            setColorLike("#444");
            
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <div className={classes.icono} >
            <span className={classes.cantLikes} >{numLikes}</span>
            <ThumbUpAltIcon onClick={like}  style={{ 
                fontSize: '2.5rem',
                transition:'all .3s ease-out',
            }}/>
        </div>
     );
}
 
export default LikePost;
