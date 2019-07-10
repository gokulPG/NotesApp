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
            <div className="list-group">
               <h2 className="list-group-item active">{this.state.note.title}</h2>
                <h3 className="list-group-item">Body: {this.state.note.body}</h3> 
               <h4 className="list-group-item">Category: {this.state.note.category && this.state.note.category.name}</h4>

              <h5 className="list-group-item">tags: </h5>
              {this.state.note.tags && (
                  <ul className="list-group-item">
                      {this.state.note.tags.map((tagItem=>{
                          return <li class="list-inline-item" key={tagItem._id}>{tagItem.tag.name}<button onClick={()=>{this.handleRemoveTag(tagItem)}}>x</button></li>
                      }))}
                  </ul>
              )}


               <Link className="list-group-item" id="center" to="/notes">back</Link>
               <Link  className="list-group-item" id="center" to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
               <button className="list-group-item" onClick={()=>{
                   this.handleCopy()
               }}>make copy</button><br/>
            </div>
        ) 
    }
}
export default NotesShow