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
                <h2>edit notes</h2>
                <NotesForm handleSubmit={this.handleSubmit} note={this.state.note} />
                <Link to="/notes">back</Link>

              
            </div>
        )
        }
    }

    export default  NotesEdit