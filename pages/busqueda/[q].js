import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../../components/layout/Sidebar';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import usePosts from '../../hooks/usePosts';
import Posts from '../../components/layout/Posts';
/**Estilos de material ui******************************************* */
const useStyles = makeStyles((theme) => ({
  titulo: {
    color:'white',
    backgroundColor:'var(--colorSecundario)',
    fontFamily:'var(--fuentePrincipal)',
    textAlign:'center',
    fontSize:'3rem',
    margin:'1rem 0',
    padding:'1rem',
    borderRadius:'.8rem',
  },
}));
/**Componente principal******************************************************* */
const Busqueda = () => {
  const classes = useStyles();
  const [resultados, setResultados]=useState([]);
  const router = useRouter();
  const { q } = router.query;
  const {listaPosts}=usePosts();
  useEffect(()=>{
    if(q && listaPosts && listaPosts.length>0){
      const posts=listaPosts.filter(post=>{
        return (
          post.titulo.toLocaleLowerCase().includes(q.toLocaleLowerCase()) ||
          post.descripcion.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        )
      });
      setResultados(posts);
    }
    
  },[q, listaPosts]);
  return (
    <Layout>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>                        
              {resultados.length>0?
                <>
                  <p className={classes.titulo} >Resultados para "{q.toLocaleUpperCase()}" </p>
                  {resultados.map(post=>(
                    <Posts key={post.idPost} post={post} />
                  ))}
                </>
              :
              <p className={classes.titulo} >No se encontraron resultados</p>}
            </Grid>
            <Grid item xs={12} sm={4}>
                <Sidebar/>
            </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Busqueda;
