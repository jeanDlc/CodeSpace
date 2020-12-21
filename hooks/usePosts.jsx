import React,{useState, useEffect} from 'react';
import firebase from '../firebase/index';
const usePosts = () => {
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
            console.log('desmontando desde usePosts');
            unsuscribe();
          }
        }
  },[]);
    return ( {listaPosts} );
}
 
export default usePosts;