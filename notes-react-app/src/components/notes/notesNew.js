import React from 'react'
import axios from '../../config/config-axios';
import NotesForm from './notesForm'
import {Link} from 'react-router-dom'

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
            <div className="card" id="header">
                <div className="card-body">
                    <h3 className="card-title">Add New Note</h3>
                    <hr></hr>
                    <div className="card-text">
                         <NotesForm handleSubmit={this.handleSubmit}/>
                         <Link to="/notes">back</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotesNew