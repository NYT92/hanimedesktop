<template>
  <v-app>
    <v-row class="ma-4 align-start">
      <v-col cols="12" md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            v-if="ghdata"
            :src="ghdata.avatar_url"
            :lazy-src="ghdata.avatar_url"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-sheet class="pa-3" color="grey">
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-row>
            </template>
          </v-img>
          <v-card-title>
            <v-icon>mdi-account-circle</v-icon>
            <span class="headline">NYT92</span>
          </v-card-title>
          <v-card-text>
            <p>
              Hello... I am Norin and I'm a self-taught programmer since 12 year
              olds. I'm also a high-school student at grade 10.
            </p>
            <p>Email : hello@nsdev.ml</p>
          </v-card-text>
          <v-card-actions>
            <v-btn href="https://nyt92.co" target="_blank">
              <v-icon>mdi-web</v-icon>
              Website
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card class="mx-auto" max-width="900">
          <v-card-title>
            <v-icon>mdi-settings</v-icon>
            <span class="headline">Settings</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <p>SOON</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" max-width="900">
          <v-card-title>
            <v-icon>mdi-info</v-icon>
            <span class="headline">About Application</span>
          </v-card-title>
          <v-card-text>
            <p>Current Version : {{ curr_version }}</p>
            <p v-if="apiver">API Version : {{ apiver }}</p>
          </v-card-text>
          <v-card-title>
            <span class="headline">Check Updates</span>
          </v-card-title>
          <v-card-actions>
            <v-btn
              dark
              @click="checkup"
              :loading="loading"
            >
              <v-icon>mdi-update</v-icon>
              Check Updates
            </v-btn>
            <div>
              <v-dialog v-model="dialog" persistent max-width="320">
                <v-card>
                  <v-card-title class="text-h5">
                    New Updates Available!
                  </v-card-title>
                  <v-card-text>
                    Do you want to update Hanime Desktop Now?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      No
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                      href="https://github.com/nyt92/hanimedesktop/releases/latest"
                      target="_blank"
                    >
                      Yes (Recommended)
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-snackbar v-model="snackbar" :timeout="timeout">
                You have updated to the latest version.
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ghdata: null,
      curr_version: "v1.1.0-beta",
      updata: null,
      apiver: null,
      dialog: false,
      snackbar: false,
      timeout: 2200,
      loading: false,
    };
  },
  methods: {
    async checkup() {
      this.loading = true;
      await axios
        .get("https://api.github.com/repos/nyt92/hanimedesktop/releases/latest")
        .then((response) => {
          if (response.data.tag_name === this.curr_version) {
            this.snackbar = true;
            this.loading = false;
          } else {
            this.dialog = true;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    await axios.get("https://v3hani.nsdev.ml").then((res) => {
      this.apiver = res.data.New_Current_Version;
    });
    await axios
      .get("https://api.github.com/users/nyt92")
      .then((res) => {
        this.ghdata = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get("https://api.github.com/repos/nyt92/hanimedesktop/releases/latest")
      .then((res) => {
        this.updata = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
