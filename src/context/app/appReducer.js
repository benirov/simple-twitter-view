import {
    REGISTER,
} from '../../types';


export default ( state, action) => {
    switch(action.type) {
        case REGISTER:
            return {
                ...state,
                user: action.payload,
                register: true
            }

        default:
            return state;
    }
}