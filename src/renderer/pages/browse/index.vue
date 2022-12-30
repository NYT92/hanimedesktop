<template>
  <div>
    <v-tabs v-model="tab" icons-and-text>
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tag">
        Tags
        <v-icon>mdi-tag</v-icon>
      </v-tab>
      <v-tab href="#brand">
        Brands
        <v-icon>mdi-office-building</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tag">
        <v-card>
          <div class="grid-ctn">
            <div v-for="data in browse.tags" :key="data.id">
              <router-link :to="'/browse/tags/' + data.text">
                <div class="media-container4">
                  <v-img
                    :src="data.tall_image_url"
                    :alt="data.text"
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
                  <p>{{ data.text }}</p>
                  <span style="color: gray"
                    ><v-icon>mdi-video</v-icon> {{ data.count }}</span
                  >
                </div>
              </router-link>
            </div>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item value="brand">
        <v-card>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="data in browse.brands"
                :key="data.id"
                :to="'/browse/brands/' + data.slug"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="data.title"></v-list-item-title>
                  <v-list-item-subtitle
                    ><span style="color: gray"
                      ><v-icon>mdi-video</v-icon> {{ data.count }}</span
                    ></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      browse: null,
      tab: null,
    };
  },
  async asyncData() {
    const res = await axios.get("https://hani.nsdev.ml/browse");
    return {
      browse: res.data,
    };
  },
};
</script>

<style>
.grid-ctn {
  display: grid;
  align-items: baseline;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
}

.media-container4 {
  height: 100%;
  width: 11rem;
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

.media-container4:hover {
  box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.3);
  background-color: rgb(74, 74, 74);
}

.media-container4 > p {
  margin-top: 16px;
  margin-bottom: 0px;
  text-decoration: initial;
}
</style>
