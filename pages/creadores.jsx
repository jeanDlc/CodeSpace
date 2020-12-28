import React from 'react';
import Layout from '../components/layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import useUsuarios from '../hooks/useUsuarios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link';
import LiStyleUsuario from '../components/layout/LiStyleUsuario';
/**Estilos de material ui*************************************** */
const useStyles = makeStyles(() => ({
  lista: {
    width: '100%',
    listStyle:'none',
    padding:0
  },
  titulo:{
    textAlign:'center',
    color:'var(--colorPrincipal)',
    marginTop:'7rem'
  },
}));
/**Componente principal******************************** */
export default function Creadores() {
  const classes = useStyles();
  
  //lista de usuarios o creadores
  const usuarios=useUsuarios();
  
  //despliega la lista de todos los usuarios
  return (
    <>
      <Layout>
        <CssBaseline />
        <Container maxWidth="sm">
          <h1 className={classes.titulo} >Creadores</h1>
          <p>Conoce a los creadores de contenido</p>
          <ul className={classes.lista} >
            {usuarios.map(user=>(
              <LiStyleUsuario key={user.idUsuario} usuario={user.datos} />
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  )
}
