import Layout from '../components/layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import useUsuario from '../hooks/useUsuario';
export default function Creadores() {
  const id='2loC1iBBR9RIjMcR0qqOhw8Z4Tx1';
  const {usuarioBuscado, errorGetUsuario}=useUsuario(id);
  console.log(usuarioBuscado ,errorGetUsuario);
  return (
    <>
      <Layout>
        <CssBaseline />
        <Container maxWidth="lg">
          <h1>Creadores</h1>
        </Container>
      </Layout>
    </>
  )
}
