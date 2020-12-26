import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'

  /**Estilos para el buscador***********************************************/
const useStyles = makeStyles({
    buscador: {
      position: 'relative',
      '& input:focus':{
          border:'2px solid #e5abf3'
      },
    },
    lupa:{
        position:'absolute',
        right:'1rem',
        top:'1rem',
        fontSize:'1.5rem',
        color:'var(--colorPrincipal)',
        border:'none',
        backgroundColor:'transparent',
        cursor:'pointer'
    }
  });
  /**Componente principal************************************** */
const Buscador = () => {
    const router = useRouter();

    //estilos
    const classes = useStyles();

    //state local con información de lo que se quiere buscar
    const [busqueda,setBusqueda]=useState('');

    //redireccionar
    const empezarConsulta=e=>{
        e.preventDefault();
        if(busqueda.trim()==='') return;
        e.target.reset();
        router.push({
            pathname:'/busqueda/[q]',
            query:{q:busqueda}
        })
    }
    return ( 
        <form onSubmit={empezarConsulta}
            className={classes.buscador}
        >
            <input type="text" 
                placeholder="Buscar un post..."
                onChange={e=>setBusqueda(e.target.value.trim())}
            />
            <button type="submit" className={classes.lupa}>                            
                &#x2315;
            </button>
        </form>
     );
}
 
export default Buscador;