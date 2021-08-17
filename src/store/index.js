import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import diarySlice from '../features/diary/diarySlice';
import entrySlice from "../features/entry/entrySlice";
import updateSlice from '../features/update-Slice';
const store = configureStore(
    {
        reducer: {
            user:userSlice,
            diary:diarySlice,
            entry:entrySlice,
            update:updateSlice,
        }
    }
)

export default store