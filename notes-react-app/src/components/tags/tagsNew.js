import React from 'react'
import TagsForm from './tagsForm'
import axios from '../../config/config-axios';

class TagsNew extends React.Component{

    handleSubmit=(formData)=>{
        axios.post('/tags', formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                this.props.history.push(`/tags/${response.data._id}`)
            }
        })
    }
    render(){
        return(
            <div>
                <h2>Add Tags</h2>
                <TagsForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default TagsNew