import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module
  namespaced: true,
  // data
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed
  getters: {},
  //methods
  // 변이, mutations 에서만 data 수정가능
  mutations: {
    updateState(state, payload) {
      // ['movies','message','loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 비동기, data를 수정하지 않는 메서드
  // payload: 메서드가 실행될 때 인수로 들어온 데이터
  actions: {
    async searchMovies({ state, commit }, payload) {
      if(state.loading) return 

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const result = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = result.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(result)
        console.log(totalResults)
        console.log(typeof totalResults)
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
  
        // 추가 요청 전송
        if(pageLength > 1) {
          for(let page = 2; page <= pageLength; page++) {
            if(page > (payload.number / 10)) break
            const result = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = result.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return 

      commit('updateState', {
        theMovie: {},
        loading: true
      })
      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_APIKEY = '7035c60c'
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_APIKEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_APIKEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

/*
  actions: {
    searchMovies(context) {
      // context.state
      // context.getters
      // context.commit
    }
  }
*/