import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
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
        fontFamily:'var(--fuentePrincipal)',
        fontWeight:'300'
    },
    descripcion:{
        color:'#444',
        margin:'0 0 1rem 0'
    },
  }));
/**Componente principal Post***************************************** */
const Posts = ({post}) => {

    const classes = useStyles();

    /**Información traída de la BBDD */
    const {titulo, comentarios, numLikes,fecha, descripcion,idCreador,url,urlImagen}=post;

    useEffect(()=>{
        if(idCreador){
            getInfoCreador(idCreador);
        }
    },[]);

    const getInfoCreador=idCreador=>{
        //console.log(idCreador);
    }
    return (
        
        <div className={classes.contenedorPosts}>
            <Paper elevation={2}>
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
            </Paper>
        </div>
    );
}
 
export default Posts;