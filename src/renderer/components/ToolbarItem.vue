<template>
  <div class="d-inline-flex items-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          text
          plain
          fab
          v-bind="attrs"
          v-on="on"
          @click="$router.back()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <span>Back</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          text
          plain
          fab
          v-bind="attrs"
          v-on="on"
          @click="$router.forward()"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </template>
      <span>Forward</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "HanimeDesktop",
    };
  },
};
</script>
