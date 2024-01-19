<template>
    <div class="main">
      <h1>{{ name }}</h1>
      
      <EDataTableFilterForm
        :headers="config"
        :filterValues="filter"
      />
  
      <EDataTableBaseTable
        v-if="dataLoaded"
        :items="paginatedItems"
        :sortKey="sortKey"
        :sortBy="sortBy"
        :config="config"
      />
  
      <EDataTablePagination
        :totalItems="filteredItems.length"
        :itemsPerPage="pageSize"
        :currentPage="currentPage"
        @changeCurrentPage="changeCurrentPage"
        @changePageSize="changePageSize"
      />
    </div>
  </template>
  
  <script>
  import usersData from "../../../assets/data/users.json";
  
  export default {
    data() {
      return {
        items: usersData,
        filter: {},
        sortKey: "",
        sortBy: "" ,
        pageSize: 10,
        currentPage: 1,
        dataLoaded: true,
      };
    },
    props: {
      name: {
        type: String,
      },
      endpoint: {
        type: String,
      },
      config: {
        type: Array,
      },
    },
    computed: {
      filteredItems() {
        let filtered = this.items;
  
        // Handle changes in filterable parameters
        this.config.forEach((header) => {
          if (header.filterable) {
            const filterValue = this.filter[header.value];
            if (filterValue) {
              filtered = filtered.filter((item) =>
                item[header.value].toLowerCase().includes(filterValue.toLowerCase())
              );
            }
          }
        });
  
        // Sorting by sortKey
         if(this.sortBy === 'increase') {
            filtered.sort((a, b) => (a[this.sortKey] > b[this.sortKey] ? 1 : -1));
         }
         if(this.sortBy === 'decrease') {
            filtered.sort((a, b) => (a[this.sortKey] > b[this.sortKey] ? -1 : 1));
         }
  
        this.currentPage = 1;
  
        return filtered;
      },
     //  List of items based on currentPage
      paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredItems.slice(startIndex, endIndex);
      },
    },
    methods: {
      changeCurrentPage(newValue) {
        this.currentPage = newValue;
      },
      changePageSize(newValue) {
        this.pageSize = newValue;
      },
    },
    watch: {
      "$route.query": {
        handler(query) {
          // Update filter and sorting based on query parameters
          this.config.forEach((header) => {
            if (header.filterable) {
              this.filter[header.value] = query[header.value] || ""; 
            }
          });
  
          this.sortKey = query.sortKey || "";
          this.sortBy = query.sortBy || ""
        },
        immediate: true,
      },
    },
    created() {
      // Initialize the filter object based on the filterable headers
      this.config.forEach((header) => {
        if (header.filterable) {
          this.filter[header.value] = "";
        }
      });
  
      // Update filter based on query parameters
      this.config.forEach((header) => {
        if (header.filterable) {
          this.filter[header.value] = this.$route.query[header.value] || "";
        }
      });
    },
  };
  </script>
  
  <style scoped>
  .main {
    text-align: center;
    font-family: 'Lato', sans-serif;
  }
  
  .container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .filter-form {
    display: flex;
    justify-content: space-around;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  }
  </style>
  