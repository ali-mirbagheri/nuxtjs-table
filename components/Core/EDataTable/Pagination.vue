<template>
  <div class="pagination">
    <button
      @click="firstPage"
      :class="`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`"
    >
      &lt;&lt;
    </button>
    <button
      @click="prevPage"
      :class="`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`"
    >
      &lt;
    </button>
    <span class="pagination-info">
      Page
      <input
        type="text"
        id="pageNumberInput"
        :value="currentPage"
        @input="handleChangePageNumber"
        class="input-style"
      />
      of {{ totalPages }}
    </span>
    <button
      @click="nextPage"
      :class="`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`"
    >
      >
    </button>
    <button
      @click="lastPage"
      :class="`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`"
    >
      >>
    </button>
    <p class="select-label">Items per page:</p>
    <div class="custom-select">
      <select
        :value="itemsPerPage"
        @input="handleChangeItemsPerPage"
        class="select-box"
      >
        <option class="select-option" :value="10">10</option>
        <option class="select-option" :value="25">25</option>
        <option class="select-option" :value="50">50</option>
        <option class="select-option" :value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // number of all pages we can have based on totalItems and items per page
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    // methods for handling pagination
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('changeCurrentPage', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('changeCurrentPage', this.currentPage + 1);
      }
    },
    lastPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('changeCurrentPage', this.totalPages);
      }
    },
    firstPage() {
      if (this.currentPage > 1) {
        this.$emit('changeCurrentPage', 1);
      }
    },
    handleChangePageNumber(event) {
      // check if the page number is currect
      let enteredValue = parseInt(event.target.value, 10);
      if (enteredValue > this.totalPages) {
        enteredValue = this.totalPages;
      }
      if (enteredValue > 0) {
        this.$emit('changeCurrentPage', enteredValue);
      } else {
        this.$emit('changeCurrentPage', 1);
      }
    },
    handleChangeItemsPerPage(event) {
      this.$emit('changePageSize', event.target.value);
    },
  },
};
</script>

<style scoped>

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-style {
  padding: 4px;
  border: 1px solid #25252A;
  border-radius: 4px;
  margin-right: 10px;
  width: 50px; 
}

.pagination-btn {
  padding: 10px;
  background-color: #FDB713;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:hover {
  background-color: #e3a107;
}

.prev-btn {
  margin-right: 10px;
}

.next-btn {
  margin-left: 10px;
}

.pagination-info {
  font-size: 16px;
  color: #333;
}

.custom-select {
  position: relative;
  display: inline-block;
}

.custom-select .select-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
}

.custom-select .dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  z-index: 1;
  display: none;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
}

.custom-select .dropdown-content a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s ease;
}

.custom-select .dropdown-content a:hover {
  background-color: #f2f2f2;
}

.custom-select:focus-within .dropdown-content {
  display: block;
}

.custom-select .arrow {
  margin-left: 10px;
  border: solid #333;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
}

.custom-select {
  position: relative;
  display: inline-block;
}

.select-box {
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  appearance: none; 
  padding: 10px 30px;
  margin: 5px;
}

.select-box option {
  background-color: #fff;
}

.custom-select::after {
  content: "▼";
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none; 
}

.select-box:hover {
  background-color: #f2f2f2;
  border-color: #999;
}

.select-option {
  padding: 25px;
  cursor: pointer;
}

.select-label {
  margin: 10px;
}

.disabled {
  background: rgb(134, 134, 134);
  cursor: auto;
}

.disabled:hover {
  background: rgb(134, 134, 134);
}
</style>
