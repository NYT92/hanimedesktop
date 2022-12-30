<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Hanime Desktop</v-list-item-title>
          <v-list-item-subtitle>Version 1.1.0</v-list-item-subtitle>
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
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link to="/auth">
          <v-list-item-icon>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Authentication</v-list-item-title>
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
      <ToolbarItem />
      <v-spacer></v-spacer>
      <AccountMenu />
    </v-app-bar>
    <v-main>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title> {{ dialogtlt }} </v-card-title>
          <v-card-text>
            {{ dialogmsg }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> No </v-btn>
            <v-btn
              v-if="sessionexp === true"
              color="primary"
              text
              to="/auth"
              @click="reset_data_expired"
            >
              ReAuth
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <Nuxt keep-alive />
    </v-main>
  </v-app>
</template>

<script>
import AccountMenu from "../components/AccountMenu.vue";
import ToolbarItem from "../components/ToolbarItem.vue";
export default {
  data: () => ({
    drawer: null,
    dialog: false,
    dialogmsg: "",
    dialogtlt: "",
    sessionexp: false,
    items: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "Browse", icon: "mdi-tag", route: "/browse" },
      { title: "Search", icon: "mdi-magnify", route: "/search" },
      { title: "Settings", icon: "mdi-cog", route: "/setting" },
    ],
  }),
  components: { AccountMenu, ToolbarItem },
  mounted() {
    this.checkUserSessionExpired();
  },
  methods: {
    checkUserSessionExpired() {
      const getdata = JSON.parse(localStorage.getItem("hanime_user_data"));
      if (!getdata || getdata === null) {
        return false
      } else if (Date.now() > getdata.session_key_expires_at * 1000) {
        this.dialog = true;
        this.dialogtlt = "Session has expired!";
        this.dialogmsg =
          "Please reauthenticate your account to update your data and session key.";
        this.sessionexp = true;
        console.log("expired");
      }
      console.log("Not expired");
    },
    reset_data_expired() {
      localStorage.removeItem("hanime_user_data");
      window.location.reload();
    },
  },
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
