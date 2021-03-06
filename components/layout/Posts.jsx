import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { formatDistance} from 'date-fns';
import { es } from 'date-fns/locale/';
import Link from 'next/link';
import useUsuario from '../../hooks/useUsuario';
import Avatar from '@material-ui/core/Avatar';
import LikePost from '../ui/LikePost';
import ComentariosPosts from '../ui/ComentariosPost';

/**Estilos para material ui******************************************* */
const useStyles = makeStyles((theme) => ({
    contenedorPosts: {
      '& > *': {
        marginBottom:'2rem',
        width:'100%',
        padding:'2rem',
        borderRadius:'1.5rem',
      },
    },
    tituloPost:{
        color:'var(--colorSecundario)',
        display:'block',
        fontSize:'2.5rem',
        marginBottom:'1rem',
        marginTop:'1rem',
        fontFamily:'var(--fuentePrincipal)',
        fontWeight:'300'
    },
    descripcion:{
        color:'var(--dark)',
        margin:'0 0 1rem 0'
    },
    contenedorImagen:{
        backgroundColor:'var(--dark)',
        display:'flex',
        justifyContent:'center',
        '& img':{
            display:'block',
            heigth:'100%',
            textAlign:'center'
        }
    },
    avatar:{
        display:'flex',
        alignItems:'center',
        '& a':{
            marginLeft:'1rem',
            color:'var(--dark)',
            fontWeight:'bold',
            fontSize:'1.7rem'
        }
    },
    fecha:{
        color:'#a0a0a0',
        fontSize:'1.2rem',
        lineHeight:'.5',
        marginTop:'0',
        marginBottom:'1rem'
    }
  }));
/**Componente principal Post***************************************** */
const Posts = ({post}) => {

    const classes = useStyles();

    /**Información traída de la BBDD */
    const {titulo, comentarios, idUserLikes,fecha, descripcion,idCreador,url,urlImagen,idPost}=post;
    
    const {usuarioBuscado, errorGetUsuario}=useUsuario(idCreador);

    if(!usuarioBuscado) return null;
    return (
        
        <div className={classes.contenedorPosts}>
            <Paper elevation={2}>
                {usuarioBuscado?
                    <div className={classes.avatar}>
                        <Avatar alt="Foto perfil" src={usuarioBuscado.urlFotoPerfil} />
                        <Link href={`/usuario/${idCreador}`}>
                            <a>{usuarioBuscado.nombre} {usuarioBuscado.apellido}</a>
                        </Link>
                    </div>
                : null}
            
                {url? (
                    <>
                        <h2 className={classes.tituloPost}>
                            <a href={url} target="_blank" className={classes.tituloPost}>{titulo} </a>
                        </h2>
                        <p className={classes.fecha} >
                            Hace {formatDistance(fecha, new Date(),{locale:es})} 
                        </p>
                    </>
                ):
                    <h2 className={classes.tituloPost} >{titulo}</h2>
                }
                <p className={classes.descripcion} >{descripcion} </p>
                <div className={classes.contenedorImagen}>
                    <Link href={`/post/${idPost}`}>
                        <a><img src={urlImagen} alt="Imagen"/></a>
                    </Link>
                </div>
                             
                <LikePost idPost={idPost} idUserLikes={idUserLikes} />
                <ComentariosPosts idPost={idPost} comentarios={comentarios} />
            </Paper>
        </div>
    );
}
 
export default Posts;