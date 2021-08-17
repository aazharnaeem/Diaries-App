import {createSlice} from '@reduxjs/toolkit'

const diaries=[]
const diary = createSlice({
    name:'Diary',
    initialState:{diaries},
    reducers:{
        addDiaries:(state,action)=>{
            return{
                ...state,
                diaries:action.payload
            }
        }
    }
})


export const  {addDiaries} = diary.actions
export default diary.reducer