const express = require( "express" );
const app = express();
const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const path = require( "path" );
const mongoose = require( "mongoose" );
const port = process.env.PORT || 4002;
require( "dotenv" ).config();
const { MONGO_URI } = process.env;

app.use( bodyParser.json() );
app.use( cors() );

//mongoose
mongoose.connect( MONGO_URI )

//data schema and model
const movieSchema = {
    title: String,
    genre: String,
    year: String
}

const Movie = mongoose.model( "Movie", movieSchema );

//api routes
app.get( '/movies', ( req, res ) => {
    Movie.find().then( movies => res.json( movies ) )
} )
app.post( '/newMovie', ( req, res ) => {
    const title = req.body.title;
    const genre = req.body.genre;
    const year = req.body.year;
    const newMovie = new Movie( {
        title,
        genre,
        year
    } )
    newMovie.save();
} )
app.delete('/delete/:id', (req, res) => {
    Movie.findByIdAndDelete({_id: req.params.id}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("movie deleted", data)
        }
    })
})

app.listen( port, () => {
    console.log( "express is running" )
} )
