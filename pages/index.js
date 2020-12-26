import React from 'react';
import Layout from '../components/layout/Layout';
import Posts from '../components/layout/Posts';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../components/layout/Sidebar'; 
import usePosts from '../hooks/usePosts';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  const classes = useStyles();
  
  const {listaPosts}=usePosts();
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <Layout>

          <CssBaseline />
          <Container maxWidth="lg">              
              <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}  sm={7} md={8} >                        
                        {listaPosts.map(post=>(
                          <Posts key={post.idPost} post={post} />
                        ))}
                    </Grid>
                    <Grid item xs={12}  sm={5} md={4} >
                          {bigScreen && (
                              <Sidebar/>
                          )}
                        
                    </Grid>
                </Grid>
              </div>
          </Container>
          
      </Layout>
    </>
  )
}
