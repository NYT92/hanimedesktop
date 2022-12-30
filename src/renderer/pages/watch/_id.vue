<template>
  <div class="mx-15 my-5" v-if="info">
    <v-dialog v-model="dialogselectql" width="500">
      <v-card>
        <v-card-title> Select video quality </v-card-title>
        <v-card-text>
          <v-list flat>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in qualityURL"
                :key="i"
                @click="launchVLC(item.url)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-video</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.html }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card>
      <client-only>
        <VideoPlayer
          :option="{
            url: urlstrm,
            quality: qualityURL,
            autoPlayback: saveprogress,
          }"
          style="aspect-ratio: 16/9; position: inherit; z-index: 1"
          @get-instance="getInstance"
        ></VideoPlayer>
      </client-only>
    </v-card>
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
        <v-btn outlined color="primary" @click="refrsh" :loading="refrshld">
          <v-icon>mdi-reload</v-icon>
          Reloads
        </v-btn>
        <v-btn
          v-if="isVLCinpath"
          outlined
          color="orange"
          @click="dialogselectql = true"
        >
          <v-icon>mdi-vlc</v-icon>
          Watch via VLC
        </v-btn>
        <v-divider class="my-4"></v-divider>
      </div>
    </v-card>
    <v-card dark>
      <v-row class="align-start pa-4">
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
            Brand :
            <router-link :to="'/browse/brands/' + info.info.brand_slug">{{
              info.info.brand
            }}</router-link>
          </p>
        </v-col>
      </v-row>
    </v-card>
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
  </div>
</template>

<script>
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer.vue";
export default {
  data() {
    return {
      ifr: null,
      urlstrm: "",
      saveprogress: true,
      dialogselectql: false,
      settings: null,
      qualityURL: [],
      isVLCinpath: false,
      info: null,
      tags: null,
      refrshld: false,
      hani_data: null,
    };
  },
  components: {
    VideoPlayer,
  },
  head() {
    return {
      title: this.info.title,
    };
  },
  methods: {
    loadSettingConfig() {
      if (process.client) {
        const getdata = JSON.parse(localStorage.getItem("user_setting_data"));
        if (!getdata || getdata === null) {
          this.isVLCinpath = false;
        } else {
          this.isVLCinpath = true;
          this.urlstrm = this.ifr.streams.find(
            (item) =>
              item.height === getdata.settings.default_resolution ||
              item.height === "720" ||
              item.height === "360"
          ).url;
          console.log(this.ifr.streams.find(
            (item) =>
              item.height === getdata.settings.default_resolution ||
              item.height === "720" ||
              item.height === "360"
          ).url)
          this.saveprogress = getdata.settings.save_current_play;
        }
      }
    },
    refrsh() {
      this.$router.app.refresh();
      this.refrshld = true;
      setTimeout(() => {
        this.refrshld = false;
      }, 4000);
    },
    getInstance(art) {
      art.on("ready", () => {
        console.log("bruh");
      });
    },
    launchVLC(url) {
      if (process.client) {
        const getdata = JSON.parse(localStorage.getItem("user_setting_data"));
        if (!getdata || getdata === null) {
          this.isVLCinpath = false;
        } else {
          require("electron").ipcRenderer.send(
            "launchvlc_stream",
            url,
            getdata.settings.vlcpath
          );
        }
      }
    },
    checkifVLCinpath() {
      if (process.client) {
        const getdata = JSON.parse(localStorage.getItem("user_setting_data"));
        if (!getdata || getdata === null) {
          this.isVLCinpath = false;
        } else {
          this.isVLCinpath = true;
        }
      }
    },
  },
  mounted() {
    const qURL = this.ifr.streams;
    qURL.forEach((e) => {
      if (e.url === "") {
        const arr = this.qualityURL;
        arr.push({
          html: `${e.height}p`,
          url: e.url,
        });
        arr.shift();
      } else {
        this.qualityURL.push({
          html: `${e.height}p`,
          url: e.url,
        });
      }
    });

    console.log(this.qualityURL);
    console.log(
      this.ifr.streams.find(
        (item) => item.height === "720" || item.height === "360"
      ).url
    );
    this.checkifVLCinpath();
    this.loadSettingConfig();
  },
  async asyncData({ params }) {
    let data;
    if (process.client) {
      const getdata = JSON.parse(localStorage.getItem("hanime_user_data"));
      if (!getdata || getdata === null) {
        data = "";
      } else {
        data = getdata;
      }
    }
    const options = {
      headers: {
        Token: data.session_key,
      },
    };
    const ifr = await axios.get(
      `https://hani.nsdev.ml/getVideo/${params.id}`,
      options
    );
    const info = await axios.get(
      `https://hani.nsdev.ml/getInfo/${params.id}`
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
