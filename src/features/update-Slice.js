import {createSlice} from '@reduxjs/toolkit'

const updating={}
const update = createSlice({
    name:'updates',
    initialState:updating,
    reducers:{
        updatePage:(state,action)=>{
            console.log(action.payload)
            return{
                ...state,
                update:action.payload
            }
        }
    }
})


export const  {updatePage} = update.actions
export default update.reducer