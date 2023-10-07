<template>
    <div>
      <h2>Search Results</h2>
  
      <!-- Sorting Dropdown -->
      <div>
        <label for="sort">Sort by:</label>
        <select id="sort" v-model="selectedSort" @change="handleSortChange">
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">User Rating Descending</option>
          <option value="vote_average.asc">User Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>
      </div>
  
      <!-- Genre Dropdown -->
      <div>
        <label for="genre">Filter by Genre:</label>
        <select id="genre" v-model="selectedGenre" @change="handleGenreChange">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </select>
      </div>
  
      <!-- Release Year Filter (Optional) -->
      <div>
        <label for="year">Filter by Release Year:</label>
        <select id="year" v-model="selectedDecade" @change="handleDecadeChange">
          <option value="">All Decades</option>
          <option value="1920s">1920s</option>
          <option value="1930s">1930s</option>
          <option value="1940s">1940s</option>
          <option value="1950s">1950s</option>
          <option value="1960s">1960s</option>
          <option value="1970s">1970s</option>
          <option value="1980s">1980s</option>
          <option value="1990s">1990s</option>
          <option value="2000s">2000s</option>
          <option value="2010s">2010s</option>
          <option value="2020s">2020s</option>
        </select>
      </div>
  
      <input v-model="searchTerm" @input="searchMovies" placeholder="Search for movies">
      <ul>
        <li v-for="movie in filteredMovies" :key="movie.id">
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" />
          <h3>{{ movie.title }}</h3>
          <p>{{ truncateText(movie.overview) }}</p>
          <p>Rating: {{ movie.vote_average }}</p>
          <button @click="showMovieDetails(movie)">View Details</button>
        </li>
      </ul>
    </div>
  </template>
  

  <script>
  import axios from 'axios';
  import { tmdbApiKey } from '../../config'; // Update the path accordingly
  const baseUrl = 'https://api.themoviedb.org/3';
  
  export default {
    props: ['movies'],
    data() {
      return {
        fetchedMovies: [],
        genres: [], // Store the list of genres
        selectedSort: 'popularity.desc', // Default sorting option
        selectedGenre: '', // Default genre filter
        selectedDecade: '', // Add selectedDecade property
        searchTerm: '', // Add searchTerm data property for search input
      };
    },
    methods: {
      getMoviePosterUrl(posterPath) {
        // You may need to construct the full poster URL using TMDb's image base URL
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      },
      async fetchGenres() {
        // Fetch the list of genres from the API
        try {
          const response = await axios.get(`${baseUrl}/genre/movie/list`, {
            params: {
              api_key: tmdbApiKey,
            },
          });
          this.genres = response.data.genres;
        } catch (error) {
          console.error('Error fetching genre data:', error);
        }
      },
      async searchMovies() {
        try {
          const releaseYearRange = this.getReleaseYearRange(this.selectedDecade);
          const response = await axios.get(`${baseUrl}/search/movie`, {
            params: {
              api_key: tmdbApiKey,
              query: this.searchTerm,
              sort_by: this.selectedSort,
              with_genres: this.selectedGenre,
              'primary_release_date.gte': releaseYearRange.start,
              'primary_release_date.lte': releaseYearRange.end,
            },
          });
          this.fetchedMovies = response.data.results;
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      },
      showMovieDetails(movie) {
        this.$emit('show-movie-details', movie);
      },
      handleSortChange() {
        // Trigger a new search when the sorting option changes
        this.searchMovies();
      },
      handleGenreChange() {
        // Trigger a new search when the genre filter changes
        this.searchMovies();
      },
      handleDecadeChange() {
        // Trigger a new search when the selected decade changes
        this.searchMovies();
      },
      truncateText(text) {
        // Truncate text with (...) for a cleaner display
        const maxLength = 150; // You can adjust the maximum length
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + '...';
        }
        return text;
      },
      getReleaseYearRange(decade) {
        switch (decade) {
          case '1920s':
            return { start: '1920-01-01', end: '1929-12-31' };
          case '1930s':
            return { start: '1930-01-01', end: '1939-12-31' };
          case '1940s':
            return { start: '1940-01-01', end: '1949-12-31' };
          case '1950s':
            return { start: '1950-01-01', end: '1959-12-31' };
          case '1960s':
            return { start: '1960-01-01', end: '1969-12-31' };
          case '1970s':
            return { start: '1970-01-01', end: '1979-12-31' };
          case '1980s':
            return { start: '1980-01-01', end: '1989-12-31' };
          case '1990s':
            return { start: '1990-01-01', end: '1999-12-31' };
          case '2000s':
            return { start: '2000-01-01', end: '2009-12-31' };
          case '2010s':
            return { start: '2010-01-01', end: '2019-12-31' };
          case '2020s':
            return { start: '2020-01-01', end: '2029-12-31' };
          default:
            return { start: '', end: '' }; // All decades
        }
      },
    },
    created() {
      // Fetch the list of genres when the component is created
      this.fetchGenres();
    },
    computed: {
      filteredMovies() {
        // Apply filtering by genre and release year to fetchedMovies
        let filtered = this.fetchedMovies;
  
        if (this.selectedGenre) {
          // Filter by genre
          filtered = filtered.filter(movie => movie.genre_ids.includes(parseInt(this.selectedGenre)));
        }
  
        if (this.selectedDecade) {
          // Filter by release year (optional)
          const releaseYearRange = this.getReleaseYearRange(this.selectedDecade);
          filtered = filtered.filter(
            movie =>
              movie.release_date >= releaseYearRange.start &&
              movie.release_date <= releaseYearRange.end
          );
        }
  
        return filtered;
      },
    },
  };
  </script>
  
  
  
  <style scoped>
  /* Style for the search input */
  input {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  /* MovieList.vue (scoped style) */
  
  /* Movie Card Styles */
  li {
    list-style: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px;
    padding: 0; /* Remove padding to ensure consistent size */
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    display: inline-block;
    width: 250px; /* Set a fixed width for all movie cards */
    height: 600px; /* Set a fixed height for all movie cards */
    overflow: hidden; /* Hide overflow content */
  }
  
  /* Movie Poster Image Styles */
  img {
    max-width: 100%;
    max-height: 80%; /* Limit the image height to avoid stretching */
    display: block; /* Remove any image spacing */
    margin: 0 auto; /* Center the image horizontally */
  }
  
  /* Movie Title Styles */
  h3 {
    font-size: 1.2rem;
    margin: 10px 0;
    color: #333;
  }
  
  /* Movie Description Styles */
  p {
    font-size: 1rem;
    line-height: 1.4;
    color: #666;
    max-height: 100px; /* Limit the height of the description to show ellipsis */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* Show up to 4 lines of text */
    -webkit-box-orient: vertical;
  }
  
  /* "View Details" Button Styles */
  button {
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  /* Pagination Styles */
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  
  .pagination button {
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  