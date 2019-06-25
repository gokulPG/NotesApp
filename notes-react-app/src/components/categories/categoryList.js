import React from 'react'
import axios from '../../config/config-axios';
import {Link} from 'react-router-dom'

class CategoriesList extends React.Component{
    constructor(){
        super()
        this.state={
        categories:[]
    }
}
componentDidMount(){
    axios.get(`/categories`)
    .then(response=>{
        this.setState(()=>({
            categories:response.data
        }))
})
}

    handleDelete=(category)=>{
        const confirmRemove = window.confirm('are you sure?')
        if (confirmRemove) {
            axios.delete(`/categories/${category._id}`, {
                headers: {
                    'x-auth': localStorage.getItem('userAuthToken')
                }
            })
                .then(() => {
                    this.setState((prevState) => ({
                        categories: prevState.categories.filter(categoryItem => {
                            return categoryItem._id !== category._id
                        })
                    }))
                })
        }
    }

render(){
    return(
        <div>
            <h2>categories list:{this.state.categories.length}</h2>
            <ul>
            {this.state.categories.length>0 && this.state.categories.map((category)=>{
                return <li key={category._id}><Link to={`/categories/${category._id}`}>{category.name}<button onClick={()=>{this.handleDelete(category)}}>X</button></Link>
               </li>

            })}
            </ul>

            <Link to='/categories/new'>Add categories</Link>
            
        </div>
    )
}
}
export default CategoriesList