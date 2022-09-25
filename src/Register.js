import React, { useContext, useState, useEffect } from 'react';
import appContext from './context/app/appContext';

import { useMutation, gql } from '@apollo/client';


export const ADD_USER = gql`
mutation($user : Add){
	addUser(user : $user){
	  username
	  }
  }
`;

const Register = () => {

    //acceder al state
	const AppContext = useContext(appContext);

    const [datos, setDatos] = useState({
        username: '',
    })

    const {
		registerUser,
	  } = AppContext;

    const [addUser] = useMutation(ADD_USER, {
		onComplete(data){
		}
	})

    const [message, setMessage] = useState(null)

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const createUser = async () => {

			if(datos.username === '')  return setMessage("username is required");
            const Data = {
                "user":{
                "username": datos.username,
                }
            };
              addUser({
                    variables: Data
                }).then((data) => {
                    console.log("data", data.data.addUse);
                    registerUser(data.data.addUser);
                });
                
			//await userRegister(datos);
			
	}
    return ( <>
    
    <div className="container-form">

        <div className="text-center"><h2 >Identificate</h2></div><br /><br />
        {message &&  <div className="text-center"><h2 >{message}</h2></div>}
			<form className="top-row-form">
			<input 
				placeholder="username" 
				type="text"
				name="username"
				id="username"
                className='input-register'
				onChange={handleInputChange}
                
			/>
			</form>
			<div className="bottom-row">
			<button className={`btn-send`} onClick={ ()=> {createUser()}} >Guardar</button>
			</div>
		</div>
    </> );
}
 
export default Register;