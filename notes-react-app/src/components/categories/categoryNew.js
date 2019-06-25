import React from 'react'
import CategoriesForms from './categoryForm'
import axios from '../../config/config-axios';

class CategoriesNew extends React.Component{
    constructor(){
        super()
        this.handleSumbit=this.handleSumbit.bind(this)
    }

    handleSumbit(formData){
        axios.post(`/categories`,formData)
        .then(response=>{
            if(response.data.hasOwnProperty('error')){
                console.log(response.data.error)
            }else{
                this.props.history.push(`/categories/${response.data._id}`)
            }
        })
    }
    render(){
        return(
            <div>
                <h3>Add New category:</h3>
            <CategoriesForms handleSumbit={this.handleSumbit}/>
            </div>
        )
    }

}
export default CategoriesNew