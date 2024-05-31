<template>
  <div>
    <ProductsPageHeader @change="find"/>
    <div class="container-products">
      <ProductItem v-if="products.length > 0" v-for="product in products" :key="product.id" :product="product" />
    </div>
    <Pagination :pageNumber="cPageNumber" :pages="pages" @change="handleChangePage" />
  </div>
</template>

<script>
import DatabaseMixin from '../../mixins/DatabaseMixin'
import ProductItem from '../../components/ProductItem.vue'
import Pagination from '../../components/Pagination.vue'
import ProductsPageHeader from './ProductsPageHeader.vue'


export default {
  name: 'Products',
  mixins: [ DatabaseMixin ],
  components: { ProductItem, ProductsPageHeader, Pagination },
  data () {
    return {
      products: [],
      params: {
        name: '',
        pageNumber: 1
      }
    }
  },
  computed: {
    cPageNumber () {
      return this.params.pageNumber - 1
    }
  },
  methods: {
    async find (text) {
      if (text) {
        this.params.pageNumber = 1
      }
      const response = this.finByNameOrCategory(text ?? this.search)
      this.products = response.data[this.cPageNumber] ?? []
      this.pages = this.generatePagesArray(this.cPageNumber, response.count, this.products?.length, 10)
    },
    handleChangePage (page) {
      if (page === '...') {
        return
      }
      this.params.pageNumber =  page
      this.products = this.dbPages[this.cPageNumber]
      this.pages = this.generatePagesArray(this.cPageNumber, this.count, this.products?.length, 10)
    }
  },
  async mounted () {
    await this.loadDatabase()
    const response = this.finByNameOrCategory('')
    this.products = response.data[this.cPageNumber]
    this.pages = this.generatePagesArray(this.cPageNumber, response.count, this.products?.length, 10)
  }
}

</script>

<style>

.container-products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 38rem;
}

@media (min-width: 1024px) {
  .container-products {
    width: 60rem;
  }
}
.container-products > div {
  margin: 10px
}
</style>
