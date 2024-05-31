<template>
  <div class="pagination-container container-flex">
      <div
        class="pagination-button"
        :class="{
          'active': pageNumber + 1 === page
        }"
        style="height: 2rem; border: 1px solid rgba(0, 0, 0, 0.2); padding: 0.2rem 0.6rem; border-radius: 2px;" v-for="page in pages"
        @click="$emit('change', page)"
        >
        {{String(page)}}
      </div>
    </div>
</template>
<script>

export default {
  name: 'Pagination',
  props: {
    pageNumber: {
      type: Number,
      default: 0
    },
    pages: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
.pagination-button:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
}
.pagination-button {
  padding: 1rem 2rem;
}

.active {
  background-color: blue;
  color:white;
}
.pagination-container {
  display: flex;
  gap: 5px;
  height: 5rem;
  align-items: center;
  justify-content: center;
}
</style>
