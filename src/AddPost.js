import React, { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import appContext from './context/app/appContext';

export const ADD_POST = gql`
mutation($post : AddP){
	addPost(post : $post){
	  text
	  date
	  user{
		username
	  }
	  }
  }
`;



const AddPost = () => {

	//acceder al state
	const AppContext = useContext(appContext);

	const [tweetbutton, settweetbutton] = useState('');
	const [tweet, setweet] = useState({
		tweet : ''
	});

	const [addPost] = useMutation(ADD_POST, {
		onComplete(data){
			
		}
	})

	const {
    	user
	  } = AppContext;

	const onInputchange = e => {
		setweet({
			...tweet,
			[e.target.name] : e.target.value
		});
	  }

	  const onSubmit = (event) => {
		event.preventDefault();
		if(tweet.tweet === '') return false;
		const Data = {
			"post":{
			  "text": tweet.tweet,
			  "user": {
						"username": user.username     
			  }
			}
		  };
		setweet({
			tweet: ''
		  });
		settweetbutton("");
		addPost({
			variables: Data
		});
	  };

	  const sendData = () => {
		

	  }
	
    return ( 
        <div className="right-column">
			<form className="top-row"  onSubmit={onSubmit}>
			<input 
				placeholder="¿ Què estas pensando ?" 
				type="text"
				name="tweet"
				autoComplete='off'
				value={tweet.tweet}
				id="tweet"
				onChange={(e) => {onInputchange(e); tweet.tweet !== ''  ? settweetbutton("set-opacity") : settweetbutton("")}}
			/>
			</form>
			<div className="bottom-row">
			<button className={`tweet-btn ${tweetbutton}`} type="button" onClick={(event) => onSubmit(event)}>Twittear</button>
			</div>
		</div>
     );
}
 
export default AddPost;