<template>
  <div class="main">
    <!-- with the endpoint parameter we can use this table component just with passing api link and config array -->
    <EDataTable name='Users List' :config="config" endpoint="../assets/data/users.json" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      // set the array type you want to show in table in here
      config: [
        { text: 'User ID', value: 'id', sortable: false, filterable: false  },
        { text: 'Name of the User', value: 'name',  sortable: false, filterable: true },
        { text: 'Date of Registration', value: 'date',  sortable: [{ name: 'newest', value: 'decrease' } , { name: 'oldest', value: 'increase' } ,{ name: 'no sort', value: '' }], filterable: false },
        { text: ' Address', value: 'address',  sortable: false, filterable: true },
        { text: 'Phone Number', value: 'phone', sortable: false, filterable: true }
      ],
    };
  },
};
</script>
