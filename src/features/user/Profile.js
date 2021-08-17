import React from 'react'
import { useSelector } from 'react-redux'
import {Header} from '../../Components/header'
export const Profile =()=>{
    const user = useSelector(state => state.user.users)
    console.log(user)
    return(
        <div>
            <Header>
            <h1>Profile</h1>
            </Header>
        </div>
    )
}