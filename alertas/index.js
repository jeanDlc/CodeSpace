import Swal from 'sweetalert2';
export default function mostrarAlertas(titulo,mensaje, icono){
    Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje,
    })
}