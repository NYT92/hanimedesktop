<template>
  <v-row class="ma-4 flex-column">
    <v-col>
      <h1 v-if="error.statusCode === 404">
        <v-icon>mdi-information</v-icon>
        404 : Page Not Found
      </h1>
      <h1 v-else="error.statusCode === 500">
        <v-icon>mdi-information</v-icon>
        500 : Internal Server Error
      </h1>
    </v-col>
    <v-col>
      <v-btn to="/"> Home </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["error"],
};
</script>
