<template>
  <v-app>
    <div v-if="ifr">
      <v-col>
        <v-card>
          <v-responsive :aspect-ratio="16 / 9">
            <iframe
              :src="ifr.player_url"
              frameborder="0"
              width="100%"
              height="100%"
              allowfullscreen
            ></iframe>
          </v-responsive>
        </v-card>
      </v-col>
    </div>
    <div v-if="info">
      <v-col>
        <v-card class="pa-4" dark>
          <h2>{{ info.title }}</h2>
          <span>Views : {{ info.views }}</span>
          <div class="mt-2">
            <v-btn
              outlined
              color="primary"
              :href="info.downloadURL"
              target="_blank"
            >
              <v-icon>mdi-download</v-icon>
              Download (Hanime.tv)
            </v-btn>
            <v-btn
              outlined
              color="primary"
              @click="refrsh"
              :loading="refrshld"
            >
              <v-icon>mdi-reload</v-icon>
              Reloads
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-card class="ma-4" dark>
        <v-col class="pa-5">
          <v-row class="align-start">
            <v-col cols="auto">
              <div>
                <img
                  :src="info.poster"
                  :alt="info.slug"
                  style="border-radius: 4px; width: 200px; height: 100%"
                />
              </div>
            </v-col>
            <v-col class="pa-2">
              <div>
                <v-btn
                  v-if="info.info.censored == true"
                  outlined
                  color="error"
                  to="/browse/tags/censored"
                  class="my-3"
                >
                  Censored
                </v-btn>
                <v-btn
                  v-else="info.info.censored == false"
                  outlined
                  color="success"
                  to="/browse/tags/uncensored"
                  class="my-3"
                >
                  Uncensored
                </v-btn>
              </div>
              <div v-html="info.description"></div>
              <p>
                Released Date : {{ info.info.released_date }} <br />
                Uploaded Date : {{ info.info.uploaded_date }} <br />
                Brand : <router-link :to="'/browse/brands/'+ info.info.brand_slug">{{ info.info.brand }}</router-link>
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </div>
    <div>
      <v-col>
        <v-card class="pa-4" dark>
          <div>
            <h2>Tags</h2>
            <v-chip-group>
              <v-chip
                v-for="(data, index) in tags"
                :key="index"
                :to="'/browse/tags/' + data + '?p=0'"
              >
                {{ data }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-card>
      </v-col>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ifr: null,
      info: null,
      tags: null,
      refrshld: false,
    };
  },
  head() {
    return {
      title: this.info.title,
    };
  },
  methods: {
    refrsh() {
      this.$router.app.refresh()
      this.refrshld = true;
      setTimeout(() => {
        this.refrshld = false;
      }, 4000);
    },
  },
  async asyncData({ params }) {
    const ifr = await axios.get(
      "https://v4hani.nsdev.ml/getVideo/player?id=" + params.id
    );
    const info = await axios.get(
      "https://v4hani.nsdev.ml/getInfo?id=" + params.id
    );
    return {
      ifr: ifr.data,
      info: info.data,
      tags: info.data.tags,
    };
  },
};
</script>

<style>
.embed-responsive {
  height: 480px;
  width: 100%;
}
</style>
