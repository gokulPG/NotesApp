import React from 'react'
import {Link } from 'react-router-dom'

class TagsShow extends React.Component{
    constructor(){
        super()
        this.state={
            tag:{}
        }
    }
    render(){
        return(
            <div>
                <h4>Tags:{this.state.tag.name}</h4>
            <Link to="/tags">Back</Link>
            </div>
        )
    }
}

export default TagsShow