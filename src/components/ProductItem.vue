<template>
  <div class="container">
    <div style="display: flex; justify-content: center; align-items: center;">
      <div class="image">
        <img style="max-width: 100%; max-height: 100%" :src="product.src" @error="replaceByDefault"/> 
      </div>
    </div>
    <div class="product-info">
      <a class="label" :href="`products/${product.id}`"> {{ product.name }}</a>
      <div class="label">
        <span v-if="size" v-for="(size, index) in cProductSizes"> {{ size }} {{ index !== cProductSizes.length -1 ? '|' : '' }} </span> 
      </div>
    </div>
    <div class="product-footer">
      <div>
        {{ cPriceLabel }}
      </div>
    </div>
  </div>
</template>
<script>
import DatabaseMixin from '../mixins/DatabaseMixin'

export default {
  name: 'ProductItem',
  mixins: [ DatabaseMixin ],
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cPriceLabel () {
      if (!this.product.sale_price) {
        return `Não informado`
      }
      const priceSplited = String(this.product.sale_price).split(".")
      if (priceSplited[1].length > 1) {
        return `R$ ${String(this.product.sale_price).replace('.', ',')}`
      }
      return `R$ ${priceSplited[0]},${priceSplited[1]}0`
    },
    cProductSizes () {
      return this.product.variants.map((v) => v.value)
    }
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = 'blank-image.jpg'
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.container {
  display:flex;
  padding: 1rem;
  flex-direction: column;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  height: 15rem;
}

.product-info{
  font-size: 12px;
}

.product-info {
  width: 8rem;
  margin-bottom: 1rem;
}

.product-info  > a{
  font-weight: bold;
}

.product-info  span{
  opacity: 0.8;
}

.product-footer {
  margin-top: auto;
}

.label{
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  text-decoration: none;            
}

.image {
  width: 5rem;
  height: 5rem;
}

@media (max-width: 1024px) {
  .image {
    width: 5rem;
    height: 5rem;
  }

  .product-info {
    width: 6rem;
  }

  .product-info, .product-footer{
    font-size: 10px;
  }
}
</style>
