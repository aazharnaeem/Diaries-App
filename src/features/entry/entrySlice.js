import { createSlice } from '@reduxjs/toolkit'

const entries = []
const entry = createSlice({
    name: 'Entry',
    initialState: { entries },
    reducers: {
        addEntries: (state, action) => {
            return {
                ...state,
                entries: action.payload
            }
        },
        removeEntries: (state, action) => {
            return {
                ...state,
                entries: []
            }
        }
    }
})


export const { addEntries, removeEntries } = entry.actions
export default entry.reducer