import React from "react";
import axios from "../../config/config-axios";
import { Link } from "react-router-dom";

class CategoriesShow extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      category: {}
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/categories/${id}`).then(response => {
      console.log(response.data.category);
      console.log(response.data.notes);
      console.log(response.data);
      this.setState(() => ({
        category: response.data.category,
        notes: response.data.notes
      }));
    });
  }

  render() {
    return (
      <div>
        <p>
          {Object.keys(this.state.category).length > 0 &&
            this.state.category.name}
        </p>
        <p>list of notes</p>
        <ul>
            {this.state.notes.map(note => {
              return <li key={note._id}> {note.title}</li>;
            })}
        </ul>

        <Link to="/categories">Back</Link>
        {/* <Link to={`/categories/edit/${this.props.match.params.id}`}>Edit</Link> */}
      </div>
    );
  }
}

export default CategoriesShow;