<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script>
import MovieList from '~/components/MovieList.vue'
import Headline from '~/components/Headline.vue'
import Search from '~/components/Search.vue'

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  created() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>