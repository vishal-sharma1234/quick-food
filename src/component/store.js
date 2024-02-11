
import {configureStore , createReducer} from "@reduxjs/toolkit"

 
 export  const reducer = createReducer({
    cartItem:[],
},{
    addToCart  : (state , action)=>{
        state.cartItem.push(action.payload)
    }
});

 

const store = configureStore({
    reducer : {
        cart : reducer
    }
})

export default store