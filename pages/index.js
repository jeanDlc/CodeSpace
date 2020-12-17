
import React,{useEffect, useState, useContext} from 'react';
import Layout from '../components/layout/Layout';
import Link from 'next/link'
import firebase from '../firebase/index';
import Posts from '../components/layout/Posts';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {FirebaseContext} from '../firebase/index';
import Avatar from '@material-ui/core/Avatar';
import Sidebar from '../components/layout/Sidebar'; 
/**Estilos de material ui******************************************* */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:'2rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign:'center'
  },
  avatar:{
    display:'flex',
    alignItems:'center',
    '& p':{
      marginLeft:'2rem'
    }
  }
}));
/**Componente principal******************************************************* */
export default function Home() {
  const {usuario}=useContext(FirebaseContext);
  const classes = useStyles();
  const [listaPosts, setListaPosts]=useState([]);
  
  useEffect(()=>{
        const ac = new AbortController();
        let unsuscribe;
        const getPosts=async()=>{
          try {
            unsuscribe=await firebase.db.collection('posts').orderBy('fecha', 'desc')
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
              setListaPosts(posts);
            });
      
          } catch (error) {
            console.log(error);
          }
          
        }
        getPosts();
        return () => {
          ac.abort();
          if(unsuscribe){
            console.log('desmontando desde index');
            unsuscribe();
          }
        }
  },[]);
  

  return (
    <>
      <Layout>

          <CssBaseline />
          <Container maxWidth="lg">              
              <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>                        
                        {listaPosts.map(post=>(
                          <Posts key={post.idPost} post={post} />
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Sidebar/>
                    </Grid>
                </Grid>
              </div>
          </Container>
          
      </Layout>
    </>
  )
}
