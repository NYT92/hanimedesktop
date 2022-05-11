<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Hanime Desktop</v-list-item-title>
          <v-list-item-subtitle>Version 1.1.0 Beta</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
          <h4>Made By NYT92</h4>
          <v-row>
            <v-col>
              <v-btn
                href="https://github.com/nyt92/hanimedesktop/issues"
                target="_blank"
              >
                <v-icon>mdi-exclamation</v-icon>
                Report Issue
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <BreadCum />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <Nuxt keep-alive />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BreadCum from "../components/BreadCum.vue";
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "Browse", icon: "mdi-tag", route: "/browse" },
      { title: "Search", icon: "mdi-magnify", route: "/search" },
      { title: "Settings", icon: "mdi-cog", route: "/setting" },
    ],
  }),
  components: { BreadCum },
};
</script>

<style>
.theme--dark.v-application {
  background-color: var(--v-background-base, #2c2c2c) !important;
}
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
</style>
