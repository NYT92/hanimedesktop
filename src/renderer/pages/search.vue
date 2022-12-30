<template>
  <div class="ma-10 d-flex justify-center align-center flex-column">
    <div class="col">
      <h2 class="mb-2">Search</h2>
      <form class="d-flex align-center">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          :error-messages="searchErrors"
          label="Search hentai videos"
          required
          @keyup.enter="submit"
        ></v-text-field>
        <v-btn class="ml-5" @click="submit" :loading="loading">
          <v-icon>mdi-magnify</v-icon>
          Search
        </v-btn>
      </form>
    </div>
    <div v-if="results">
      <h2>Results</h2>
      <v-row class="ma-5 flex justify-center">
        <div v-for="data in results" :key="data.id">
          <router-link :to="'/watch/' + data.slug">
            <div class="media-container">
              <v-img :src="data.cover_url" :alt="data.slug" width="100%">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0 d-flex justify-center align-center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <p>{{ data.name }}</p>
            </div>
          </router-link>
        </div>
      </v-row>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    search: { required },
  },
  data: () => ({
    search: "",
    results: null,
    loading: false,
  }),
  computed: {
    searchErrors() {
      const errors = [];
      if (!this.$v.search.$dirty & !this.$v.search.$empty) return errors;
      !this.$v.search.required && errors.push("query is required.");
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.loading = true;
      if (!this.$v.$invalid) {
        axios
          .get(`https://hani.nsdev.ml/search?q=${this.search}`)
          .then((res) => {
            this.loading = false;
            this.results = res.data.results;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      console.log(this.search);
    },
  },
};
</script>
<style>
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
