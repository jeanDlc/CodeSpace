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
import Descripcion from '../../components/ui/Descripcion';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    contenedorPerfil:{
        marginTop:'1rem'
    },
    contenedorInfo: {
        backgroundColor: 'var(--colorPrincipal)',
        background:'linear-gradient(90deg, rgba(53,136,163,1) 35%, rgba(132,94,194,1) 100%)',
        '& section':{
            padding: '1rem',
            borderRadius:'1.5rem',
            marginBottom:'1.5rem',
            display:'flex',
            justifyContent:'space-around',
            color:'white',
            flexWrap:'wrap',
            fontWeight:'bold',
        }
    },
    mb:{
        marginBottom:'1rem'
    }
  }));
const Post = () => {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();
    const [postsUsuario, setPostsUsuario]=useState([]);
    const {usuario}=useContext(FirebaseContext);
    const router = useRouter();

    //el id de usuario que llega por get
    const { pid } = router.query;
    
    const {usuarioBuscado}=useUsuario(pid);

    useEffect(()=>{
        let desmontado=false;
        
        let unsuscribe;
        //obtiene todos los posts de un usuario

        const obtenerPosts=(idUsuario)=>{
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
            if(unsuscribe){
                console.log('desmontando desde usuario/[pid]');
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
            <Grid container
                spacing={2} 
                className={classes.contenedorPerfil}
                >
                
                <Grid item xs={12}  md={8}  >     
                                   
                    <Paper className={classes.contenedorInfo} >
                        <section>
                            <p>
                                Seguidores: {usuarioBuscado.idUserSeguidores.length}
                            </p>
                            <p>
                                Publicaciones: {postsUsuario.length} 
                            </p>
                            <p>
                                Seguidos: {usuarioBuscado.idUserSeguidos.length} <FavoriteIcon/>
                            </p>
                        </section>
                    </Paper>
                    {!bigScreen && (
                        <div className={classes.mb} >
                            <BtnSeguir 
                                    idUsuario={pid} 
                                    usuarioBuscado={usuarioBuscado}
                            />
                        </div>
                    )}
                    <Descripcion idUsuario={pid} descripcion={usuarioBuscado.descripcion} />

                    {postsUsuario.map(post=>(
                        <Posts key={post.idPost} post={post} />
                    ))}
                </Grid>
                
                <Grid item xs={12}  md={4}>
                        <BtnSeguir 
                            idUsuario={pid} 
                            usuarioBuscado={usuarioBuscado} 
                        />
                        {usuario && usuario.usuario.uid===usuarioBuscado.idAuth && bigScreen?(
                            <Sidebar/>
                        ) : null}
                </Grid>
            </Grid>
        </Container>
      </Layout>
  )
}

export default Post
