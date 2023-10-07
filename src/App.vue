<template>
  <div id="app">
    <header>
      <h1>Movie Searcher</h1>
      <nav>
        <button @click="showMovieList">Home</button>
        <button @click="goBackToMovieList">Back to List</button>
      </nav>
    </header>

    <MovieList
      v-if="showMovieList"
      :movies="movies"
      @show-movie-details="showMovieDetails"
    />
    <MovieDetails
      v-else
      :movie="selectedMovie"
      @go-back="goBackToMovieList"
    />
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue';
import MovieDetails from './components/MovieDetails.vue';

export default {
  name: 'App',
  components: {
    MovieList,
    MovieDetails,
  },
  data() {
    return {
      showMovieList: true, // Initially, show the movie list
      movies: [], // Store the list of movies here
      selectedMovie: null, // Store the selected movie here
    };
  },
  methods: {
    // Event handler to switch to the movie details view
    showMovieDetails(movie) {
      this.showMovieList = false;
      this.selectedMovie = movie;
    },
    // Event handler to go back to the movie list view
    goBackToMovieList() {
      this.showMovieList = true;
      this.selectedMovie = null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Header Styles */
header {
  background-color: #0078d4;
  color: white;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 24px;
  margin: 0;
}

nav button {
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
}

nav button:hover {
  background-color: #005aa0;
}
</style>
