<template>
  <div class="ctn my-15">
    <div v-if="error.statusCode === 404">
      <h2>
        <v-icon>mdi-information</v-icon>
        Page not found...
      </h2>
      <p>{{ error.message }}</p>
    </div>
    <div v-else>
      <h2>
        <v-icon>mdi-information</v-icon>
        Application error
      </h2>
      <p>{{ error.message }}</p>
    </div>
    <v-btn to="/"> Home </v-btn>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
<style>
.ctn {
  display: grid;
  place-items: center;
}
</style>
