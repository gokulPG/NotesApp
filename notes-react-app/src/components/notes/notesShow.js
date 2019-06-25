import React from 'react'
import axios from '../../config/config-axios';
import {Link} from 'react-router-dom'

class NotesShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note:{}
        }
        this.handleRemoveTag=this.handleRemoveTag.bind(this)
        this.handleCopy=this.handleCopy.bind(this)
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{  
            // console.log(response.data)
            this.setState(()=>({
                note:response.data
            }))
        })
    }
  
    handleRemoveTag(tag){
        const id=this.props.match.params.id
        axios.delete(`/notes/removeTag?noteId=${id}&tagId=${tag._id}`,{ 
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
    }

    handleCopy(){
        console.log(this.state.note)
        const formData={
             title:this.state.note.title,
             body:this.state.note.body,
             category:this.state.note.category,
             tag:this.state.note.tags.map(tag=>({tag:tag._id}))
        }
        
        axios.post(`/notes`,formData, { 
            headers:{
            'x-auth':localStorage.getItem('userAuthToken')
        }
      })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.error)
            }else{
                this.props.history.push('/notes')
            }
        })

    }
    render(){
        return(
            <div>
               <h3>Title:{this.state.note.title}</h3>
                <p>Body:{this.state.note.body}</p> 
               <h4>Category:{this.state.note.category && this.state.note.category.name}</h4>

              <h5>tags: </h5>
              {this.state.note.tags && (
                  <ul>
                      {this.state.note.tags.map((tagItem=>{
                          return <li key={tagItem._id}>
                          {tagItem.tag.name}<button onClick={()=>{this.handleRemoveTag(tagItem)}}>x</button></li>
                      }))}
                  </ul>
              )}


               <Link to="/notes">back</Link>
               <Link to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
               <button onClick={()=>{
                   this.handleCopy()
               }}>make copy</button>
            </div>
        ) 
    }
}
export default NotesShow