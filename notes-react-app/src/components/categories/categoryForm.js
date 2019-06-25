import React from 'react'

class CategoriesForms extends React.Component{
    constructor(){
        super()
        this.state={
            name:''
        }
    }
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSumbit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name
        }
        this.props.handleSumbit(formData)
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSumbit}>
                    <label> Name:
                        <input type="text" value={this.state.name} 
                        onChange={this.handleChange} name="name"/>
                    </label><br/><br/>
                    
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default CategoriesForms