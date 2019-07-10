import React from 'react'
import axios from '../../config/config-axios'


class NotesLogin extends React.Component{
    constructor(){
    super()
    this.state={
        email:'',
        password:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
}
handleChange(e){
    e.persist()
    this.setState(()=>({
        [e.target.name]:e.target.value
    }))
}
handleSubmit(e){
    e.preventDefault()
    const formData={
        email:this.state.email,
        password:this.state.password
    }
    console.log(formData)
    axios.post(`/users/login`,formData)
    .then(response=>{
        console.log(response.data)
        if(response.data.errors){
            alert(response.data.errors)
        }else{
            const token=response.data.token
            localStorage.setItem('userAuthToken',token)
            this.props.handleAuth(true)
            this.props.history.push('/users/account') 
        }
    })

}
render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <h2>LOGIN</h2>
        <div class="form-group">  
       <label for="exampleInputEmail1">
              email
             <input type="text" name="email" value={this.state.email}  onChange={this.handleChange} class="form-control" id="exampleInputEmail1" placeholder="Email"/>
               </label><br/>
                </div>   
                <div class="form-group">                          
                    <label  for="exampleInputPassword1">                                
                          password
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                     </label><br/>
                </div>   
            <input type="submit"/>   
        </form>
    )
}
}

export default NotesLogin