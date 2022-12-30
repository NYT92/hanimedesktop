<template>
  <div v-if="atb" class="ma-5">
    <h2>Brand : {{ this.$route.params.id }}</h2>
    <v-row class="ma-4 flex justify-center">
      <div v-for="data in atb.videos" :key="data.id">
        <div class="media-container3">
          <router-link :to="'/watch/' + data.slug">
            <img
              style="width: 100%; object-fit: cover; border-radius: 4px"
              :src="data.cover_url"
              :alt="data.slug"
            />
            <p>{{ data.name }}</p>
          </router-link>
        </div>
      </div>
    </v-row>
    <div>
      <v-pagination
        v-model="page"
        class="my-4"
        :length="atb.page"
        :total-visible="10"
        @input="onPageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      atb: null,
      page: 1,
    };
  },
  async mounted() {
    await this.onPageChange();
  },
  methods: {
    getTag: async function () {
      const { data } = await axios.get(
        `https://hani.nsdev.ml/browse/brands/${this.$route.params.id}/${this.page}`
      );
      this.atb = data;
    },
    onPageChange() {
      this.getTag();
    },
  },
};
</script>

<style>
.media-container3 {
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
}

.media-container3:hover {
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.3);
  background-color: rgb(74, 74, 74);
}

.media-container3 > img {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.media-container3 > p {
  margin-top: 16px;
  margin-bottom: 0px;
  text-decoration: initial;
}
</style>
