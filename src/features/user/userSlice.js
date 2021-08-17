import {createSlice} from '@reduxjs/toolkit'

const users={}
const isLogedin= false
const user = createSlice({
    name:'user',
    initialState:users,
    reducers:{
        adduser:(state,action)=>{
            return{
                ...state,
                users:action.payload,isLogedin:true
                
            }
        },
        removeuser:(state,action)=>{
            return{
                ...state,
                users: {}, isLogedin:false
            }
        },
    }
})


export const  {adduser, removeuser} = user.actions
export default user.reducer