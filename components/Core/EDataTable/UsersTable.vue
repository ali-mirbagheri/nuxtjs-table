<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(header, index) in config"
          :key="index"
          :sortable="header.sortable"
          :filterable="header.filterable"
        >
          {{ header.text }}
          <!-- This section is for sortable items -->
          <div v-if="header.sortable" class="sorting-section">
            <p>Sort by </p>
            <div v-for="sortOption in header.sortable" class="sort-option-container">
              <input
              :key="sortOption.name"
              type="radio"
              :id="`${header.value}-${sortOption.name}`"
              :value="sortOption.value"
              :checked="sortKey === header.value && sortBy === sortOption.value"
              :name="`${header.value}-sort-options`"
              @change="handleSortChange(sortOption.value, header.value)"
            />
            <label
              :key="sortOption.name"
              :for="`${header.value}-${sortOption.name}`"
            >
              {{ sortOption.name }}
            </label></div>
          </div>
          <!--  -->
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td v-for="(header, index) in config" :key="index">
          {{ user[header.value] }}
        </td>
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
    sortBy: {
      type: String,
      required: true,
    },
    sortKey: {
      type: String,
      required: true,
    },
    config: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleSortChange(value , parameter) {
      if (!value) {
        this.$router.replace({
          query: { ...this.$route.query, sortKey: undefined , sortBy: undefined },
        });
      } else {
        this.$router.replace({
          query: { ...this.$route.query, sortKey: parameter , sortBy: value },
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

.sort-option-container {
  display: flex;
  align-items: center;
}
</style>
