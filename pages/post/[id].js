import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import firebase from '../../firebase/index';
import Posts from '../../components/layout/Posts';
const Post = () => {
    const [post,setPost]=useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(()=>{
        const ac = new AbortController();
        let desmontado=false;
        let unsuscribe;
        const obtenerPost=pid=>{
            try {
                unsuscribe=firebase.db.collection('posts').doc(pid)
                .onSnapshot(doc=>{
                    console.log(doc.data());
                    if(!desmontado){
                        setPost({
                            idPost: pid,
                            ...doc.data()
                        });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        if(id){
            obtenerPost(id);
        }
       return () => {
            desmontado=true;
            ac.abort();
            if(unsuscribe){
                console.log('desmontando desde post/[id]');
                unsuscribe()
            }
            
       }
    },[id]);
    
    if(!post) return <p>...Loading</p>
    return (
        <Layout>
            <CssBaseline />
                <Container maxWidth="sm">
                    <Posts key={post.idPost} post={post} />
                </Container>
            
        </Layout>
    )
}

export default Post
