import React from 'react'
import axios from '../../config/config-axios';

class NotesAccount extends React.Component{
    constructor(){
        super()
        this.state={
            user:{}
        }
    }
    // tokens are sending to server
    componentDidMount(){
        axios.get(`/users/account`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        }) 
        .then (response=>{
            console.log(response.data)
            const user=response.data
            this.setState({user}) //when our current value doesn't depend on previous value, that time 

        })
    }
    render(){
        return(
            <div>
                <h2>User Account</h2>
                <p>{this.state.user.username}</p>
            </div>
        )
    }
}
export default NotesAccount
