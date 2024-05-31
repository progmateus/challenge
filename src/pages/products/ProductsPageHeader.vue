<template>
  <div class="header">
    <div>
      <div class="title"> Buscar Produto </div>
      <div class="container-search">
        <input v-model.trim="search" @input="debounceInput" placeholder="Digite o nome ou a categoria do produto" />
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#595959" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
      </div>
    </div> 
  </div>
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'ProductsPageHeader',
  props: {
    products: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    debounceInput: lodash.debounce(function (e) {
      this.$emit('change', e.target.value)
    }, 400)
  }
}

</script>

<style>

.header {
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center
}

.title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 1rem;
}

.container-search {
  width: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 0.2rem 0.3rem;
}

.container-search > input{
  width: 90%;
  border: none;
  outline: none;
}

@media (max-width: 1024px) {
  .container-search {
    width: 18rem;
  }
}
</style>
