import React from 'react'

class TagsForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:""
        }
    }
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label> Tagname:
                    <input type="text" value={this.state.value}
                    onChange={this.handleChange} name="name"/>
                </label> <br/><br/>

                <input type="submit"/>
            </form>
        )
    }
}

export default TagsForm