const express = require( "express" );
const app = express();
const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const mongoose = require( "mongoose" );
const path = require("path");
require( "dotenv" ).config();
const { MONGO_URI } = process.env;
const port = process.env.PORT || 4002;

app.use( bodyParser.json() );
app.use( cors() );

//mongoose
mongoose.connect( MONGO_URI )


// path 

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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
app.delete( '/delete/:id', ( req, res ) => {
    Movie.findByIdAndDelete( { _id: req.params.id }, ( err, data ) => {
        if ( err ) {
            console.log( err );
        }
        else {
            console.log( "movie deleted", data )
        }
    } )
} )
if ( process.env.NODE_ENV === 'production' ) {
    app.use( express.static( 'client/build' ) )
    app.get( "*", ( req, res ) => {
        res.sendFile( path.resolve( __dirname, "client", "build", "index.html" ) );
    } )
}

app.listen( port, () => {
    console.log( "express is running"+` ${port}` )
} )
