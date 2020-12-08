
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
export default function Home() {
  const {usuario}=useContext(FirebaseContext);
  const classes = useStyles();
  const [listaPosts, setListaPosts]=useState([]);
  useEffect(()=>{
      getPosts();
  },[]);
  const getPosts=async()=>{
    try {
      const query =await firebase.db.collection('posts').orderBy('fecha', 'desc');
      query.onSnapshot(snapshot=>{
        let posts=[];
        snapshot.docChanges().forEach(change=>{
          const post={
            idPost:change.doc.id,
            ...change.doc.data()
          }
          posts.push(post);
        });
        setListaPosts(posts);
      });

    } catch (error) {
      console.log(error);
    }
  }
  console.log(listaPosts);
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
                        <Paper className={classes.paper}>
                          {usuario && usuario.photoURL && usuario.displayName!==null  ? 
                            <div className={classes.avatar}>
                              <Avatar alt="Foto de perfil" src={usuario.photoURL} />
                              <p>Bienvenido {usuario.displayName} </p>
                            </div>
                            : null  
                          }
                          {!usuario?
                            <Link href="/login">
                              <a>Inicia sesión</a>
                            </Link>
                            : null
                          }
                        </Paper>
                    </Grid>
                </Grid>
              </div>
          </Container>
          
      </Layout>
    </>
  )
}
