import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import firebaseConfig from './config';

class Firebase{
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
            this.analytics= app.analytics();

        }
        this.auth=app.auth();
        this.db=app.firestore();
        this.storage=app.storage();        
    }
    async registrar(nombre, email, password){        
        const nuevoUsuario=await this.auth.createUserWithEmailAndPassword(email, password);
        const fotoDefault='https://firebasestorage.googleapis.com/v0/b/codespace-829d2.appspot.com/o/userPhoto%2Fuser.png?alt=media&token=fecdbb8a-735d-4a28-a62c-35736ae17769';
        await nuevoUsuario.user.updateProfile({
            displayName: `${nombre}`,
            photoURL:fotoDefault
        });
        return nuevoUsuario;
    }
    async crearUserModel (id, nombre,apellido,email){
        const fotoDefault='https://firebasestorage.googleapis.com/v0/b/codespace-829d2.appspot.com/o/userPhoto%2Fuser.png?alt=media&token=fecdbb8a-735d-4a28-a62c-35736ae17769';
        const usuario={
            idAuth: id,
            nombre,
            apellido,
            email,
            descripcion:'',
            numSeguidores:0,
            listaIdSeguidos:[],
            urlFotoPerfil:fotoDefault,
            urlFotoPortada:'',
            listaIdPostFavoritos:[],
            listaIdPostsPropios:[]
        }
        console.log(usuario);
        return await this.db.collection('usuarios').add(usuario);
    }
    async login(email, password){
        return await this.auth.signInWithEmailAndPassword(email, password);
    }
    async cerrarSesion(){
        return await this.auth.signOut();
    }
}
const firebase=new Firebase();
export default firebase;