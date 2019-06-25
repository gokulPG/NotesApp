import React from 'react'
import axios from '../../config/config-axios';
import NotesForm from './notesForm'
 
class NotesNew extends React.Component{
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        console.log(formData)
        axios.post('/notes',formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            
            // console.log(response.data )
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                //change to another component
                this.props.history.push(`/notes/${response.data._id}`)
            }
        })
    }
    render(){
        return(
            <div>
                <h2>Add New Notes</h2>
                <NotesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NotesNew