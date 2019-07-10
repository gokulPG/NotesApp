import React from 'react'
import axios from '../../config/config-axios';
import {Link} from 'react-router-dom'

class NotesList extends React.Component{
    constructor(){
        super()
        this.state={
            notes:[]
        }
        this.handlePinned=this.handlePinned.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    } 

    componentDidMount(){
        axios.get(`/notes`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            this.setState(()=>({
                notes:response.data
            }))
        })
    }
    handlePinned(note){
        // const note=note
        console.log(note)
        if(note.isPinned===false){
            note.isPinned=true
        axios.put(`/notes/${note._id}`,note,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState(()=>({
                note:response.data
            }))
        }) 
    } else{ 
        note.isPinned=false
        axios.put(`/notes/${note._id}`,note,{ 
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
} 

handleDelete(note){
    const confirmRemove=window.confirm('are you sure?')
    if(confirmRemove){
        axios.delete(`/notes/${note._id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(()=>{
            this.setState((prevState)=>({
                notes:prevState.notes.filter(noteItem=>{
                    return noteItem._id!==note._id
                })
            }))
        })
    }
}

    render(){
        return(
            <div>
                <h2>Listing Notes: {this.state.notes.length}</h2>
                <hr></hr>
                <h4>UnPinned List</h4>
                <ul>
                    {this.state.notes.length>0 && this.state.notes.map(note=>{
                        console.log(note)
                        if(note.isPinned===false){
                        return <li key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link>
                         <button onClick={()=>{this.handleDelete(note)}}>X</button>
                        <button onClick={()=>{this.handlePinned(note)}}>Pin</button></li>
                        }})}
                        </ul>
                    <h4>Pinned List</h4>
                        <ul>
                         {this.state.notes.length>0 && this.state.notes.map(note=>{
                            if(note.isPinned===true){
                                return <li key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link>
                                 <button onClick={()=>{this.handleDelete(note)}}>X</button>
                                <button onClick={()=>{this.handlePinned(note)}}>Unpin</button></li>
                                }
                            })}
                </ul>
               
                <Link to="/notes/new">Add NotesList</Link>
            </div>
        )
    }
}
export default NotesList 