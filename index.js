const express = require("express");
const cors = require("cors");
const app = express();

const { initialiseDatabase } = require("./db/db.connect.js");
const { Movies } = require("./models/movies.model.js");

app.use(cors());
app.use(express.json());

initialiseDatabase();

// const sampleMovies = [
//   {
//     name: "The Shawshank Redemption",
//     director: "Frank Darabont",
//     genre: "Drama",
//   },
//   {
//     name: "Inception",
//     director: "Christopher Nolan",
//     genre: "Sci-Fi",
//   },
//   {
//     name: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     genre: "Crime",
//   },
//   {
//     name: "The Dark Knight",
//     director: "Christopher Nolan",
//     genre: "Action",
//   },
//   {
//     name: "Goodfellas",
//     director: "Martin Scorsese",
//     genre: "Crime",
//   },
//   {
//     name: "Interstellar",
//     director: "Christopher Nolan",
//     genre: "Sci-Fi",
//   },
//   {
//     name: "The Godfather",
//     director: "Francis Ford Coppola",
//     genre: "Crime",
//   },
//   {
//     name: "Fight Club",
//     director: "David Fincher",
//     genre: "Drama",
//   },
// ];

// const addMovies = async (data) => {
//   try {
//     const movies = await Movies.insertMany(data);
//     console.log(movies);
//   } catch (error) {
//     console.log("UNABLE TO ADD THE DATA", error);
//   }
// };

// addMovies(sampleMovies);

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movies.find();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies", async (req, res) => {
  const { name, director, genre } = req.body;

  try {
    const movieData = new Movies({ name, director, genre });
    await movieData.save();
    res.status(201).json(movieData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/movies/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const updatedMovie = await Movies.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovie = await Movies.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
