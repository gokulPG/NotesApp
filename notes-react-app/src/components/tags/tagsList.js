import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/config-axios';


class TagsList extends React.Component{
    constructor(){
        super()
        this.state={
            tags:[]
        }
    }
    componentDidMount(){
        axios.get(`/tags`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
           this.setState(()=>({
              tags:response.data 
           }))
        })
    }
    handleRemove=(tag)=>{
        const confirmRemove=window.confirm('Are You sure..?')
        if(confirmRemove){
            axios.delete(`/tags/${tag._id}`,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            })
            .then(()=>{
                this.setState((prevState)=>({
                    tags:prevState.tags.filter(tagItem=>{
                        return tagItem._id!==tag._id
                    })
                }))
            })
        }
    }

    render(){
        return(
            <div>
                <h2>Tags:{this.state.tags.length}</h2>
            <ul>
                {this.state.tags.map(tag=>{
                    return <li key={tag._id}>{tag.name}<button onClick={()=>{this.handleRemove(tag)}}>X</button></li>
                })}
            </ul>
            <Link to="/tags/new">Add Tag</Link>
            </div>
        )
    }
}

export default TagsList