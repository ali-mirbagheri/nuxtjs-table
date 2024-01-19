<template>
  <div class="filter-form">
    <div v-for="header in filteredHeaders" :key="header.value" class="form-group">
      <label :for="header.value + 'Input'">{{ header.text }}</label>
      <input
        type="text"
        :id="header.value + 'Input'"
        :value="filterValues[header.value]"
        @input="handleFilterChange(header.value, $event)"
        class="input-style"
        :placeholder="'Filter by ' + header.text.toLowerCase()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    filterValues:{
      type: Object,
      required: true
    }
  },
  computed: {
    filteredHeaders() {
      return this.headers.filter((header) => header.filterable);
    },
  },
  methods: {
    // Handle changes in inputs
    handleFilterChange(property, event) {
      const value = event.target.value;
      this.filterValues[property] = value;
      if (!value) {
        updateQueryParameters(this, { [property]: undefined });
      } else {
        updateQueryParameters(this, { [property]: value });
      }
    },
  },
};
</script>

<style scoped>
.filter-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.input-style {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  text-align: center;
}

.input-style:focus {
  outline: none;
  border-color: #25252A;
}
</style>
