<template>
  <div>
    <v-menu v-if="haniuser_data" bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-2" text tile v-on="on">
          <v-avatar>
            <img
              width="100px"
              :src="haniuser_data.user.avatar"
              alt="avatar_img"
            />
          </v-avatar>
          <h5>{{ haniuser_data.user.name }}</h5>
        </v-btn>
        
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <img
                :src="haniuser_data.user.avatar"
                style="width: 40px"
                alt="avatar_img"
              />
            </v-avatar>
            <h3 class="my-1">Hello {{ haniuser_data.user.name }}!</h3>
            <p class="text-caption my-1">
              {{ haniuser_data.user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text to="/setting"> Setting </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text to="/auth"> Authentication </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
    <v-menu v-if="!haniuser_data" bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-2" icon v-on="on">
          <v-avatar>
            <img
              style="width: 40px"
              src="https://api.iconify.design/mdi:account.svg?color=%23ffffff"
              alt="avatar_img"
            />
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <img
                src="https://api.iconify.design/mdi:account.svg?color=%23ffffff"
                style="width: 40px"
                alt="avatar_img"
              />
            </v-avatar>
            <h3 class="my-1">Hello Guest!</h3>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text to="/setting"> Setting </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text to="/auth"> Authentication </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notauth: true,
      auth: false,
      haniuser_data: null,
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    async loadUserData() {
      const getdata = JSON.parse(localStorage.getItem("hanime_user_data"));
      if (!getdata) {
        this.haniuser_data = null;
      } else {
        this.haniuser_data = getdata;
      }
    },
  },
};
</script>
