<template>
  <table :id="tableId" class="vert-table">
    <tbody>
      <tr
        v-for="(field, index) in data"
        :key="field.label"
      >
        <th>{{ field.label }}</th>
        <td v-html="field.value"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: {
    tableId: String,
    data: Array
  }
}

</script>

<style scoped>

.vert-table {
  /* margin-bottom: 2rem; */
}

table {
  border-collapse: separate;
  border-spacing: 2px;
  width: 100%;
}

tr:nth-child(even) {
  background-color: rgb(216, 216, 216);
}

tr:nth-child(odd) {
  background-color: rgb(240, 240, 240);
}

th {
  background-color: rgb(68, 68, 68);
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  width: 30%;
}

td {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  width: 70%;
}

</style>