<template>
    <div>
      <h2>Movie Details</h2>
      <div class="movie-details">
        <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" />
        <h3>{{ movie.title }}</h3>
        <p><strong>Overview:</strong> {{ movie.overview }}</p>
        <p><strong>Director:</strong> {{ movie.director }}</p>
        <p><strong>Genre:</strong> {{ movie.genre }}</p>
        <!-- Add more details like cast, release date, ratings, etc. -->
        <button @click="goBack">Back to Results</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['movie'],
    methods: {
      getMoviePosterUrl(posterPath) {
        // Similar to the previous component, construct the poster URL
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      },
      goBack() {
        // Emit an event to the parent component to go back to the search results
        this.$emit('go-back');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add CSS styles for your movie details component */
  </style>
  