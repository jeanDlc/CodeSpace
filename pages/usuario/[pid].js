import React,{useContext, useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Sidebar from '../../components/layout/Sidebar';
import Grid from '@material-ui/core/Grid';
import firebase,{FirebaseContext} from '../../firebase/index';
import useUsuario from '../../hooks/useUsuario';
import HeaderPerfil from '../../components/layout/HeaderPerfil';
import mostrarAlertas from '../../alertas';
import Posts from '../../components/layout/Posts';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BtnSeguir from '../../components/ui/BtnSeguir';
const useStyles = makeStyles((theme) => ({
    
    contenedorPerfil:{
        marginTop:'1rem'
    },
    contenedorInfo: {
        backgroundColor:'var(--colorSecundario)',
        '& section':{
            padding: '1rem',
            borderRadius:'1.5rem',
            marginBottom:'1.5rem',
            display:'flex',
            justifyContent:'space-around',
            color:'white'
        }
    },
  }));
const Post = () => {
    const classes = useStyles();
    const [postsUsuario, setPostsUsuario]=useState([]);
    const {usuario}=useContext(FirebaseContext);
    const [consultarDB,setConsultarDB]=useState(true);
    const router = useRouter();

    //el id de usuario que llega por get
    const { pid } = router.query;
    
    const {usuarioBuscado, errorGetUsuario}=useUsuario(pid);

    useEffect(()=>{
        let desmontado=false;
        const ac = new AbortController();
        let unsuscribe;
        //obtiene todos los posts de un usuario

        const obtenerPosts=async(idUsuario)=>{
            try {
                
                unsuscribe = firebase.db.collection('posts').where("idCreador", "==", idUsuario)
                .onSnapshot(snapshot=>{
                    let posts=[];
                    //trae todos los documentos incluso cuando solo uno se actualiza
                    snapshot.forEach(function(doc) {
                        const post={
                            idPost:doc.id,
                        ...doc.data()
                        }
                        posts.push(post);
                    });
                    if(!desmontado){
                        setPostsUsuario(posts);
                    }
                    
                });
            } catch (error) {
                mostrarAlertas('Error', 'Hubo un error', 'error');
                console.log(error);
            }
        }
        if(pid && !desmontado){
            obtenerPosts(pid);
        }
        return () => {
            desmontado=true;
            ac.abort();
            if(unsuscribe){
                console.log('desmontando desde /usuario[pid]');
                unsuscribe();
            }
        } 
    },[pid]);
    
    if( !usuarioBuscado) return <p>Loading...</p>
    return (
      <Layout>
        <CssBaseline />
        <Container maxWidth="md">
            <HeaderPerfil 
                nombre={usuarioBuscado.nombre}
                apellido={usuarioBuscado.apellido}
                id={usuarioBuscado.idAuth}
                urlFotoPerfil={usuarioBuscado.urlFotoPerfil}
                urlFotoPortada={usuarioBuscado.urlFotoPortada}
            />
            <Grid container spacing={2} className={classes.contenedorPerfil} >
                <Grid item xs={12} sm={8}>                        
                    <Paper className={classes.contenedorInfo} >
                        <section>
                            {usuarioBuscado.descripcion!==''?
                                <p>Descripción {usuarioBuscado.descripcion} </p>
                                :
                                null   
                            }
                            <p>
                                Seguidores: {usuarioBuscado.numSeguidores}
                            </p>
                            <p>
                                Publicaciones: {usuarioBuscado.listaIdPostsPropios.length} 
                            </p>
                            <p>
                                Seguidos {usuarioBuscado.listaIdSeguidos.length} <FavoriteIcon/>
                            </p>
                        </section>
                    </Paper>
                    {postsUsuario.map(post=>(
                        <Posts key={post.idPost} post={post} />
                    ))}
                </Grid>
                <Grid item xs={12} sm={4}>
                        <BtnSeguir idUsuario={pid} />
                        {usuario && usuario.usuario.uid===usuarioBuscado.idAuth?(
                            <Sidebar/>
                        ) : null}
                </Grid>
            </Grid>
        </Container>
      </Layout>
  )
}

export default Post
