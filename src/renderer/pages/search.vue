<template>
  <v-app>
    <v-row class="ma-5">
      <v-col>
        <h2>Search</h2>
        <div class="col m-3 cus-form">
          <form class="d-flex align-items-center m-2">
            <v-text-field
              v-model="search"
              :error-messages="searchErrors"
              label="Search Video"
              required
              @input="$v.search.$touch()"
              @blur="$v.search.$touch()"
            ></v-text-field>
            <v-btn @click="submit" :loading="loading"
              ><v-icon>mdi-magnify</v-icon>Search</v-btn
            >
          </form>
        </div>
        <div>
          <h2>Results</h2>
          <v-row class="ma-4 flex grid">
            <div v-for="data in results" :key="data.id">
              <router-link :to="'/watch/' + data.slug">
                <div class="media-container2">
                  <v-img
                    :src="data.cover_url"
                    :alt="data.slug"
                    width="100%"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
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
      </v-col>
    </v-row>
  </v-app>
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
      !this.$v.search.required && errors.push("Search is required.");
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.loading = true;
      if (!this.$v.$invalid) {
        axios
          .get(`https://hani.nsdev.ml/search/req?q=${this.search}`)
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
.row {
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.media-container2 {
  height: 100%;
  width: 10.5rem;
  display: flex;
  padding: 1rem;
  margin: 0.3rem;
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
  transition: 0.3s;
  align-items: center;
  flex-direction: column;
  background-color: #393939;
  padding-top: 1rem;
  border-radius: 4px;
}

.media-container2:hover {
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.3);
  background-color: rgb(74, 74, 74);
}

.media-container2 > p {
  margin-top: 16px;
  margin-bottom: 0px;
  text-decoration: initial;
}
</style>
