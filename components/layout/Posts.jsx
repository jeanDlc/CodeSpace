import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import useUsuario from '../../hooks/useUsuario';
import Avatar from '@material-ui/core/Avatar';
import LikePost from '../ui/LikePost';

/**Estilos para material ui******************************************* */
const useStyles = makeStyles((theme) => ({
    contenedorPosts: {
      '& > *': {
        marginBottom:'2rem',
        width:'100%',
        padding:'2rem',
        borderRadius:'1.5rem'
      },
    },
    tituloPost:{
        color:'var(--colorSecundario)',
        display:'block',
        fontSize:'2.5rem',
        marginBottom:'1rem',
        marginTop:0,
        fontFamily:'var(--fuentePrincipal)',
        fontWeight:'300'
    },
    descripcion:{
        color:'#444',
        margin:'0 0 1rem 0'
    },
    avatar:{
        display:'flex',
        alignItems:'center',
        '& p':{
            marginLeft:'1rem',
            color:'#444',
            fontWeight:'bold',
        }
    }
  }));
/**Componente principal Post***************************************** */
const Posts = ({post}) => {

    const classes = useStyles();

    /**Información traída de la BBDD */
    const {titulo, comentarios, numLikes,fecha, descripcion,idCreador,url,urlImagen,idPost}=post;
    //console.log(post);
    const {usuarioBuscado, errorGetUsuario}=useUsuario(idCreador);
    //console.log(usuarioBuscado ,errorGetUsuario);

    return (
        
        <div className={classes.contenedorPosts}>
            <Paper elevation={2}>
                {usuarioBuscado?
                    <div className={classes.avatar}>
                        <Avatar alt="Remy Sharp" src={usuarioBuscado.urlFotoPerfil} />
                        <p>{usuarioBuscado.nombre} {usuarioBuscado.apellido} </p>
                    </div>
                : null}
            
                {url? (
                    <h2 className={classes.tituloPost}>
                        <Link href={url}>
                            <a className={classes.tituloPost}>{titulo} </a>
                        </Link>
                    </h2>
                ):
                    <h2 className={classes.tituloPost} >{titulo}</h2>
                }
                
                <p className={classes.descripcion} >{descripcion} </p>
                <img src={urlImagen} alt="Imagen"/>                
                <LikePost idPost={idPost} numLikes={numLikes} />
            </Paper>
        </div>
    );
}
 
export default Posts;