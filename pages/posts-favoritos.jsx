import React, {useContext, useEffect, useState} from 'react';
import Layout from '../components/layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import firebase,{ FirebaseContext } from '../firebase/index';
import Post from '../components/layout/Posts';

/**Estilos de material ui*************************************** */
const useStyles = makeStyles(() => ({
  lista: {
    width: '100%',
    listStyle:'none',
    padding:0
  },
  titulo:{
    marginTop:'4rem',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    '& h1':{
      color:'var(--colorPrincipal)',
      marginRight:'1rem',
      marginBottom:'0',
      fontSize:'5rem',
      marginTop:'0'
    },
    '& svg':{
      color:'var(--colorSecundario)',
      fontSize:'3rem'
    }
    
  },
}));
/**Componente principal******************************** */
export default function Creadores() {
    const {usuario}=useContext(FirebaseContext);
    const [posts, setPosts]=useState([]);
    const classes = useStyles();

    useEffect(()=>{
        let unsuscribe;
        let desmontado=false;
        const getPostsFavoritos= ()=>{
          //trae los posts a los cuales el usuario actual les dio like
            unsuscribe= firebase.db.collection('posts').where('idUserLikes', "array-contains", usuario.usuario.uid).onSnapshot(snapshot=>{
                const resultados=[];
                snapshot.forEach(doc=>{
                    resultados.push({
                      idPost: doc.id,
                      ...doc.data()
                    });
                });
                if(!desmontado){
                  setPosts(resultados);
                }
            })
        }
        if(usuario && desmontado===false){
          getPostsFavoritos();
        }
        return ()=>{
          desmontado=true;
          if(unsuscribe){
            unsuscribe();
          }
        }
    },[usuario]);

  //despliega los posts favoritos del usuario actual
  return (
    <>
      <Layout>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className={classes.titulo} >
            <h1>Tus Favoritos</h1>
            <FavoriteIcon/>
          </div>
          {posts.length>0?(
            <p>Todos los posts que más te gustaron!!!</p> 
          ):(
            <p>Aún no hay posts</p>
          )}
          <ul className={classes.lista} >
            {posts.map(post=>(
              <Post key={post.idPost} post={post} />
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  )
}
