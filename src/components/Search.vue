<template>
  <div class="container">
    <input 
      v-model="title" 
      class="form-control"
      type="text"
      placeholder="Search for movies, series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters" 
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option 
          v-if="filter.name === 'year'" 
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button 
      class="btn btn-primary" 
      @click="apply">
      Apply
    </button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'serires','episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear()
            for(let i = thisYear; i >= 1985; i--) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    async apply() {
        // 영화 검색
        // $store의 mutation을 실행할 때는 
        // this.$store.commit() 메서드
        // $store의 actions를 실행할 때는
        // this.$store.dispatch() 메서드를 사용한다. 
        // 첫 번째 매개변수는 store js 파일의 actions에 있는 메서드이름, movie는 store/index.js 에 module로 정의한 movie를 뜻한다.
        // 두 번째 매개변수는 payload에 해당하는 데이터를 인수로 넣어준다.
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type:this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>