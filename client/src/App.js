import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ movies, setMovies ] = useState( [
    {
      title: '',
      genre: '',
      year: ''
    },
  ] );
  const [ movie, setMovie ] = useState( {
    title: '',
    genre: '',
    year: ''
  } )
  useEffect( () => {
    fetch( '/movies' ).then( res => {
      if ( res.ok ) {
        return res.json();
      }
    } ).then( data => setMovies( data ) )
  }, [ movies ] )
  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setMovie( prev => {
      return (
        {
          ...prev,
          [ name ]: value
        } )
    } )
  }
  const handleNewMovie = ( e ) => {
    e.preventDefault();
    alert( "a new movie added" )
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year
    }
    axios.post( '/newMovie', newMovie );
    setMovie( {
      title: '',
      genre: '',
      year: ''
    } )
  }
  const handleDelete = ( id ) => {
    axios.delete( '/delete/' + id )
    alert( "movie was deleted" )
  }
  return (
    <div className="App">
      <h1>Add Movie</h1>
      <form>
        <input onChange={ handleChange } name="title" type="text" value={ movie.title } placeholder="title" />
        <input onChange={ handleChange } name="genre" type="text" value={ movie.genre } placeholder="genre" />
        <input onChange={ handleChange } name="year" type="text" value={ movie.year } placeholder="year" />
        <button onClick={ handleNewMovie }>ADD</button>
      </form>
      {
        movies && movies.map( movie => (
          <div key={ Math.random() * 14000000 }>
            <h1>{ movie.title }</h1>
            <p>{ movie.genre }</p>
            <p>{ movie.year }</p>
            <button onClick={ () => handleDelete( movie._id ) }>DELETE</button>
          </div>
        ) )
      }
    </div>
  );
}

export default App;
