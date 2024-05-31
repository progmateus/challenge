import { onBeforeMount } from 'vue'
import { ListProducts } from '../services/products'

export default {
  data () {
    return {
      dbPages: [],
      db: [],
      products: [],
      pages: [],
      count: 0
    }
  },
  methods: {
    async loadDatabase () {
      await ListProducts({limit: 200}).then((res) => {
        this.db = res.data
        this.dbPages = this.separatePages(res.data, 10)
      })
    },

    separatePages (arr, size) {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
    },

    finByNameOrCategory (name) {
      return this.get(x =>{
        const index = x.categories?.findIndex((c) => c?.name.toLowerCase().includes(name?.trim().toLowerCase() || ''))

        if (index !== -1 || x.name.toLowerCase().includes(name?.trim().toLowerCase() || '')) {
          return true
        }
        return false
      })
    },

    get (predicate) {
      const data = this.db.filter(predicate)
      this.count = data.length
      return {
        data: this.separatePages(data, 10),
        count: data.length
      }
    },
    generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
      var pages = []
      var totalPages = Math.ceil(collectionLength / rowsPerPage)
      var halfWay = Math.ceil(paginationRange / 2)
      var position

      if (currentPage <= halfWay) {
          position = 'start'
      } else if (totalPages - halfWay < currentPage) {
          position = 'end'
      } else {
          position = 'middle'
      }

      var ellipsesNeeded = paginationRange < totalPages
      var i = 1
      while (i <= totalPages && i <= paginationRange) {
          var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages)
          var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'))
          var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'))
          if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
              pages.push('...')
          } else {
              pages.push(pageNumber)
          }
          i ++
      }
      return pages
    },

    calculatePageNumber (i, currentPage, paginationRange, totalPages) {
        var halfWay = Math.ceil(paginationRange/2)
        if (i === paginationRange) {
            return totalPages
        } else if (i === 1) {
            return i
        } else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
            return totalPages - paginationRange + i
        } else if (halfWay < currentPage) {
            return currentPage - halfWay + i
        } else {
            return i
        }
        } else {
            return i
        }
    }
  }
}
