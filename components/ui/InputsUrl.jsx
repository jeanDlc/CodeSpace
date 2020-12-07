import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from '../../styles/Formulario.module.css';
/**estilos de material ui**************************************************** */
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& button': {
        background: "#3588a3",
        textAlign:'end',
        color:'white'
      },
      '& button:hover': {
        background: "#845ec2",
      }
    },
  }));  
  /**componente principal******************************************** */
const InputsUrl = ({handleChange}) => {
    const classes = useStyles();    
    const [urls, setUrls]=useState([]);
    const eliminarInput=e=>{
        //console.log(e.target.parentElement.id);
        const InputsRestantes=inputs.filter(input=>input.props.id!==e.target.parentElement.id);
        //console.log(inputs[0].props.id);
        setInputs(InputsRestantes);
        console.log(InputsRestantes);
    } 
    const addUrl=e=>{
        const url=e.target.value;
        if(url.trim()===''){
            return;
        }
        setUrls([
            ...urls,
            url
        ]);
    }
    const [inputs,setInputs]=useState([
        <div key="listaUrls" id="listaUrls"  className={styles.divUrl}>
            <input                 
                type="url"                 
                name="listaUrls"
                placeholder="Escribe una URL para tu Post"            
                onChange={addUrl}
            />
        </div>
    ]);

    

    //agrega un nuevo input cada vez que se le da click al botón
    const agregarInput=()=>{
        setInputs([
            ...inputs,
            <div key={inputs.length} id={inputs.length}  className={styles.divUrl}>
                <input                     
                    type="url"
                    name={inputs.length} 
                    placeholder="Escribe una URL para tu Post"
                    onChange={addUrl}
                />
                <p onClick={eliminarInput} className={styles.btnEliminarInput}>x</p>                
            </div>
        ])
    }
    return ( 
        <>
            {
                [...inputs]
            }
            <div className={classes.root}>                      
                <Button variant="contained" onClick={agregarInput}>
                &#x271a;
                </Button>
            </div>
        </>
     );
}
 
export default InputsUrl;