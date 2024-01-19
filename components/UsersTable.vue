<template>
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Name of the User</th>
        <th>
          Date of Registration
          <div class="sorting-section">
            <p>Sort by </p>
            <input
              type="radio"
              id="newest"
              value="newest"
              :checked="dateSort === 'newest'"
              @change="handleSortChange"
            />
            <label for="newest">Newest</label>
            <input
              type="radio"
              id="oldest"
              value="oldest"
              :checked="dateSort === 'oldest'"
              @change="handleSortChange"
            />
            <label for="oldest">Oldest</label>
            <input
              type="radio"
              id="noSort"
              value=""
              :checked="dateSort === ''"
              @change="handleSortChange"
            />
            <label for="noSort">No Sort</label>
          </div>
        </th>
        <th>Address</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    dateSort: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleSortChange(event) {
      if (!event.target.value) {
        this.$router.replace({
          query: { ...this.$route.query, dateSort: undefined },
        });
      } else {
        this.$router.replace({
          query: { ...this.$route.query, dateSort: event.target.value },
        });
      }
    },
  },
};
</script>

<style scoped>
.sorting-section {
  display: flex;
  align-items: center;
}

.sorting-section label {
  cursor: pointer;
}

.sorting-section input {
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffe19c; 
  color: black; 
  font-size: 12px;
}

th,
td {
  border: 1px solid #ffe19c; 
  padding: 8px;
  text-align: left;
}

th {
  background-color: #fdb713; 
}

th:hover {
  background-color: #e3a107;
}

tbody tr:nth-child(even) {
  background-color: #fdb713; 
}

tbody tr:hover {
  background-color: #e3a107; 
}
</style>
