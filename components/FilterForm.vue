<template>
  <div class="filter-form">
    <div class="form-group">
      <label for="nameInput">Name</label>
      <input
        type="text"
        id="nameInput"
        :value="name"
        @input="handleName"
        class="input-style"
        placeholder="Filter by name"
      />
    </div>
    <div class="form-group">
      <label for="phoneInput">Phone</label>
      <input
        type="text"
        id="phoneInput"
        :value="phone"
        @input="handlePhone"
        class="input-style"
        placeholder="Filter by phone"
      />
    </div>
    <div class="form-group">
      <label for="addressInput">Address</label>
      <input
        type="text"
        id="addressInput"
        :value="address"
        @input="handleAddress"
        class="input-style"
        placeholder="Filter by address"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  methods: {
    // These methods change the query parameters.
    handleName(event) {
      if (!event.target.value) {
        updateQueryParameters(this, { name: undefined });
      } else {
        updateQueryParameters(this, { name: event.target.value });
      }
    },
    handlePhone(event) {
      if (!event.target.value) {
        updateQueryParameters(this, { phone: undefined });
      } else {
        updateQueryParameters(this, { phone: event.target.value });
      }
    },
    handleAddress(event) {
      if (!event.target.value) {
        updateQueryParameters(this, { address: undefined });
      } else {
        updateQueryParameters(this, { address: event.target.value });
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
