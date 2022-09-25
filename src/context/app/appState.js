import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import {
    REGISTER,
} from '../../types';

const AppState = ({children}) => {

    //definir state
    const initialState = {
        user: [],
        register: false,
    }

    //definir reducer
    const  [ state, dispatch ] = useReducer(appReducer, initialState);


    const registerUser  = async (user) => {
                dispatch({
                    type: REGISTER,
                    payload: user
                });

    }
    return (
        <appContext.Provider
            value={{
                user: state.user,
                register: state.register,
                registerUser,
            }}
         >
             {children}
        </appContext.Provider>
    )

}

export default AppState;