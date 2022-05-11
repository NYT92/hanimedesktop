<template>
  <v-app>
    <v-row class="ma-5">
      <h2>Brands : {{ this.$route.params.id }}</h2>
      <div>
        <v-row class="ma-4 flex grid">
          <div v-for="data in atb" :key="data.id">
            <div class="media-container3">
              <router-link :to="'/watch/' + data.slug">
                <img
                  style="width: 100%; object-fit: cover; border-radius: 4px"
                  :src="data.cover_url"
                  :alt="data.slug"
                  loading="lazy"
                />
                <p>{{ data.name }}</p>
              </router-link>
            </div>
          </div>
        </v-row>
      </div>
      <div>
        <v-btn color="primary" disabled>Previous</v-btn>
        <v-btn color="primary" disabled>Next</v-btn>
        <span>Coming Soon</span>
      </div>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      atb: null,
    };
  },
  mounted() {
    axios
      .get(
        `https://hani.nsdev.ml/browse/brands/${this.$route.params.id}/${this.$route.query.p}`
      )
      .then((response) => {
        this.atb = response.data.videos;
      });
  },
  /*
  async asyncData({ params, query }) {
    const tg = await axios.get(
      `https://v4hani.nsdev.ml/browse/hentai-tags/${params.id}/${query.p}`
    );
    return {
      atg: tg.data.videos,
    };
  },
  */
};
</script>

<style>
.row {
  align-items: baseline;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.media-container3 {
  height: 100%;
  width: 10rem;
  display: flex;
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
  transition: 0.3s;
  background-color: #393939;
  padding-top: 1rem;
  border-radius: 4px;
}

.media-container3:hover {
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.3);
  background-color: rgb(74, 74, 74);
}

.media-container3 > p {
  margin-top: 16px;
  margin-bottom: 0px;
  text-decoration: initial;
}
</style>
