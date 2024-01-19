<template>
  <div class="main">
    <h1>Users List</h1>
    
    <FilterForm
      :name="filter.name"
      :phone="filter.phone"
      :address="filter.address"
    />

    <UserTable
      v-if="dataLoaded"
      :users="paginatedUsers"
      :dateSort="dateSort"
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
import UserTable from "../components/UsersTable.vue";
import Pagination from "../components/Pagination.vue";
import usersData from "../assets/data/users.json";

export default {
  components: {
    UserTable,
    Pagination,
  },
  data() {
    return {
      users: usersData,
      filter: {
        name: "",
        phone: "",
        address: "",
      },
      dateSort: "",
      pageSize: 10,
      currentPage: 1,
      dataLoaded: true,
    };
  },
  computed: {
    filteredUsers() {
      let filtered = this.users;

      if (this.filter.name) {
        filtered = filtered.filter((user) =>
          user.name.toLowerCase().includes(this.filter.name.toLowerCase())
        );
      }
      if (this.filter.phone) {
        filtered = filtered.filter((user) =>
          user.phone.includes(this.filter.phone)
        );
      }
      if (this.filter.address) {
        filtered = filtered.filter((user) =>
          user.address.toLowerCase().includes(this.filter.address.toLowerCase())
        );
      }

      // Sort by registration date
      if (this.dateSort === 'newest') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      if (this.dateSort === 'oldest') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

      this.currentPage = 1;

      return filtered;
    },
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
        this.filter.name = query.name || "";
        this.filter.phone = query.phone || "";
        this.filter.address = query.address || "";
        this.dateSort = query.dateSort || "";
      },
      immediate: true,
    },
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
