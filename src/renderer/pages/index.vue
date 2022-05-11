<template>
  <div>
    <v-app dark>
      <div>
        <div class="ma-5">
          <v-col>
            <h2>Recently Uploaded</h2>
            <v-row>
              <v-col class="media-scrolling snaps-inline">
                <div v-for="data in recent" :key="data.id">
                  <router-link :to="'/watch/' + data.slug">
                    <div class="media-container">
                      <img :src="data.cover_url" :alt="data.slug" />
                      <p>{{ data.name }}</p>
                    </div>
                  </router-link>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <h2>Newely Uploaded</h2>
            <v-row>
              <v-col class="media-scrolling snaps-inline">
                <div v-for="data in newest" :key="data.id">
                  <router-link :to="'/watch/' + data.slug">
                    <div class="media-container">
                      <img :src="data.cover_url" :alt="data.slug" />
                      <p>{{ data.name }}</p>
                    </div>
                  </router-link>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <h2>Trending</h2>
            <v-row>
              <v-col class="media-scrolling snaps-inline">
                <div v-for="data in trend" :key="data.id">
                  <router-link :to="'/watch/' + data.slug">
                    <div class="media-container">
                      <img :src="data.cover_url" :alt="data.slug" />
                      <p>{{ data.name }}</p>
                    </div>
                  </router-link>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recent: null,
      newest: null,
      trend: null,
    };
  },
  /*
  async asyncData() {
    try {
      const recent = await axios.get("https://v4hani.nsdev.ml/getLanding/recent");
      const newest = await axios.get("https://v4hani.nsdev.ml/getLanding/newest");
      const trend = await axios.get("https://v4hani.nsdev.ml/getLanding/trending");
      return {
        recent: recent.data.results,
        newest: newest.data.results,
        trend: trend.data.results,
      };
    } catch (e) {
      console.log(e);
    }
  }, */
  async mounted() {
    await axios
      .get("https://v4hani.nsdev.ml/getLanding/recent")
      .then((res) => {
        this.recent = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get("https://v4hani.nsdev.ml/getLanding/newest")
      .then((res) => {
        this.newest = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get("https://v4hani.nsdev.ml/getLanding/trending")
      .then((res) => {
        this.trend = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.media-scrolling {
  --_spacer: 1rem;
  display: grid;
  gap: var(--_spacer);
  grid-auto-flow: column;
  padding: var(--_spacer) var(--_spacer) var(--_spacer);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  margin: .5rem;
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: var(--_spacer, 1rem);
}

.snaps-inline > * {
  scroll-snap-align: start;
}

.media-container {
  height: 100%;
  width: 12.2rem;
  display: flex;
  padding: 1rem;
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
  transition: 0.3s;
  align-items: center;
  flex-direction: column;
  background-color: #393939;
  padding-top: 1rem;
  border-radius: 4px;
}

.media-container:hover {
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.3);
  background-color: rgb(74, 74, 74);
}

.media-container > img {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.media-container > p {
  margin-top: 16px;
  margin-bottom: 0px;
  text-decoration: initial;
}
</style>
