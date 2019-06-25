import React from 'react'
import axios from '../../config/config-axios';


class NotesRegister extends React.Component{
    constructor(){
    super()
    this.state={
        username:'',
        email:'',
        password:''
    }
    this.handleInput=this.handleInput.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
}
handleInput(e){
    e.persist()
    this.setState(()=>({
        [e.target.name]:e.target.value
    }))
}
handleSubmit(e){
    e.preventDefault()
    const formData={
        username:this.state.username,
        email:this.state.email,
        password:this.state.password
    }
    // console.log(formData)
    axios.post(`/users/register`,formData)
    .then(response=>{
        console.log(response.data)
        if(response.data.errors){
            alert(response.data.message)
        }else{
            this.props.history.push('/users/login')
        }
    })
    // .catch(err=> {
    //     console.log(err)
    // })
}

render(){
    return(
        <form onSubmit={this.handleSubmit}>
            <label>Username:
                <input type="text" value={this.state.value}
                 onChange={this.handleInput} name="username"/>
            </label><br/><br/>

            <label>Email:
            <input type="text" value={this.state.value}
                 onChange={this.handleInput} name="email"/>
            </label><br/><br/>

            
            <label>Password:
            <input type="password" value={this.state.value}
                 onChange={this.handleInput} name="password"/>
            </label><br/><br/>  

            <input type="submit"/>   
        </form>
    )
}
}

export default NotesRegister