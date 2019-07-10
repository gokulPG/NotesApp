import  React from 'react'
import NotesForm from './notesForm'
import {Link} from 'react-router-dom'
import axios from '../../config/config-axios';

class NotesEdit extends React.Component{
    constructor(){
        super()
        this.state={
            note:{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            this.setState(()=>({
                note:response.data
            }))
        })

    }
    handleSubmit=(formData)=>{
       
        axios.put(`/notes/${this.state.note._id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('error')){
                console.log(response.data.errors)
            }else{
                this.props.history.push(`/notes/${response.data._id}`)
            }
        }) 
    }
    render(){
        return(
            <div>
                <div className="card" id="header">
                <div className="card-body">
                    <h3 className="card-title">Edit notes</h3>
                    <hr></hr>
                    <div className="card-text">
                        <NotesForm handleSubmit={this.handleSubmit} note={this.state.note} />
                        <Link to="/notes">back</Link>
                    </div>
                </div>
                </div>
            </div>
        )
        }
    }

    export default  NotesEdit