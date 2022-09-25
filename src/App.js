import React, { useContext, useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import shortid from "shortid";
import appContext from './context/app/appContext';
import Avatar, { genConfig } from 'react-nice-avatar'
import Post from './Post';
import Register from './Register';
import AddPost from './AddPost';

const config = genConfig() 


const GET_POST = gql`
          query{
            posts{
              text
              date
              _id
              user{
                username
              }
              
            }
          }
`;

const NEW_POST = gql`
      subscription newPost{
        newPost{
          text,
          _id
          user{
            username
          }
        }
      }
`;


const App = () => {

  const [ post, guardarpost ] = useState([]);
  const {loading, error, data, subscribeToMore} = useQuery(GET_POST);

  //acceder al state
	const AppContext = useContext(appContext);

  const {
		register,
    user
	  } = AppContext;

  useEffect(() => {
    if(data){
      guardarpost(data.posts);  
    }
  }, [data, register]);

  if(loading) return <p>Cargando...</p>
  if(error) return <p>error...</p>
  return ( 
    
    <main className="container">
        <div>
        </div>
        <section className="content">
        { register ? 
        <>
        <header className="content-header">
            <span>{user.username}</span>
          </header>
          <div className="tweet">
            <div className="left-column">
              <Avatar  className='profile-image'  {...config} />
            </div>
				    <AddPost />
			    </div>
          <div className="space">
			    </div>
          <Post 
                posts={post}
                subscribeToMorePost={() => subscribeToMore({
                  document: NEW_POST,
                  updateQuery: (prev, { subscriptionData }) =>{
                    if(!subscriptionData.data) return prev.posts
                    const newPostAdd = subscriptionData.data.newPost
                    
                    return {
                      posts:{
                        ...prev.posts,
                        newPostAdd, ...prev.posts
                      }
                    }

                  },
                })}
                key={shortid.generate()}
            />
        </> :
        <>
          <Register />
        </>

        }
        </section>
    </main>
    
   );
}
 
export default App;