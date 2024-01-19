<template>
    <div class="main">
      <h1>{{ name }}</h1>
      
      <FilterForm
        :headers="config"
        :filterValues="filter"
      />
  
      <UserTable
        v-if="dataLoaded"
        :users="paginatedUsers"
        :sortKey="sortKey"
        :sortBy="sortBy"
        :config="config"
      />
  
      <Pagination
        :totalItems="filteredUsers.length"
        :itemsPerPage="pageSize"
        :currentPage="currentPage"
        @changeCurrentPage="changeCurrentPage"
        @changePageSize="changePageSize"
      />
    </div>
  </template>
  
  <script>
  import FilterForm from "./FilterForm.vue";
  import UserTable from "./UsersTable.vue";
  import Pagination from "./Pagination.vue";
  import usersData from "../../../assets/data/users.json";
  
  export default {
    components: { FilterForm, UserTable, Pagination },
    data() {
      return {
        users: usersData,
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
      filteredUsers() {
        let filtered = this.users;
  
        // Handle changes in filterable parameters
        this.config.forEach((header) => {
          if (header.filterable) {
            const filterValue = this.filter[header.value];
            if (filterValue) {
              filtered = filtered.filter((user) =>
                user[header.value].toLowerCase().includes(filterValue.toLowerCase())
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
     //  List of users based on currentPage
      paginatedUsers() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredUsers.slice(startIndex, endIndex);
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
  