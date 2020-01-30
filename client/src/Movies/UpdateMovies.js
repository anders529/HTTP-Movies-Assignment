import React, {useEffect, useState} from "react";
import axios from "axios";
function UpdateMovie(props) {
    const [status, setStatus] = useState();
    const [updateMovie, setUpdateMovie] = useState({
          title: '',
          director: '',
          metascore: '',
          actor: '',
          stars: []
      });
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(response => {
                setUpdateMovie(response.data);
            })},[]);
    const handleChange = event => {setUpdateMovie({...updateMovie,[event.target.name]: event.target.value})};
    const handleSubmitMovies = event => {
        event.preventDefault();
          axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, updateMovie)
              .then(response => {
                  setStatus(response.statusText);
                  props.history.push('/');
              })
              .catch(error => {
                  console.log(error)
              })};
    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmitMovies}>
                <input
                    type="text"
                    placeholder="Movie Title"
                    value={updateMovie.title}
                    onChange={handleChange}
                    name="title"/>
                <input
                    type="text"
                    placeholder="Director"
                    value={updateMovie.director}
                    onChange={handleChange}
                    name="director"/>
            <input
                    type="number"
                    placeholder="Meta Score"
                    value={updateMovie.metascore}
                    onChange={handleChange}
                    name="metaScore"/>
            <button>Update Movie</button>
            </form>
            {status ? <p>{status}</p>:null}
        </div>
    )}
export default UpdateMovie;