<template>
  <div class="ctn ma-10">
    <v-dialog v-model="dialogprompt" width="500">
      <v-card>
        <v-card-title> Are you sure you want to do it? </v-card-title>
        <v-card-text>
          This will clear your saved login data information.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="updateData"> Yes </v-btn>
          <v-btn color="primary" text @click="dialogprompt = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card v-if="!hani_user_data" width="600px">
      <v-card-title class="flex justify-center align-center">
        <img
          height="150px"
          src="https://static-assets-44d.pages.dev/images/logo-300-krak.png"
        />
        Authentication to Hanime
      </v-card-title>
      <v-card-actions class="ma-8 flex flex-column align-stretch">
        <v-form ref="form" v-model="valid" lazy-validation>
          <p class="red--text" v-if="errormsg">{{ errormsg }}</p>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="pass"
            :rules="passRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login(email, pass)"
          >
            Authentication
          </v-btn>
          <v-btn
            color="red"
            class="mr-4"
            href="https://hanime.tv/create-account"
            target="_blank"
          >
            Create Account
          </v-btn>
        </v-form>
      </v-card-actions>
    </v-card>
    <v-card v-else width="600px" min-height="600px">
      <v-card-title class="flex justify-center align-center flex-column">
        <v-avatar>
          <img :src="hani_user_data.user.avatar" alt="avatar_img" />
        </v-avatar>
        <h2>
          {{ `${hani_user_data.user.name}#${hani_user_data.user.id_num}` }}
        </h2>
      </v-card-title>
      <div class="flex justify-center align-center">
        <v-list>
          <v-subheader>Information</v-subheader>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-identifier</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                >ID : {{ hani_user_data.user.id }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-calendar-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                >Created at :
                {{
                  new Date(hani_user_data.user.created_at).toDateString("en", {
                    timeZone: "UTC",
                  })
                }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Email : {{ hani_user_data.user.email }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Coins : {{ hani_user_data.user.coins }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                >Premium status :
                {{ hani_user_data.user.premium_status }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account Slug</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Slug : {{ hani_user_data.user.slug }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <v-list-item>
          <v-list-item-content>
            Updated at :
            {{
              new Date(hani_user_data.user.updated_at).toDateString("en", {
                timeZone: "UTC",
              })
            }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-expansion-panels accordion>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Your Session Token</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <p class="hov_t_unl my-5">{{ hani_user_data.session_key }}</p>
                  <span class="subtitle-1 font-weight-bold red--text my-2"
                    >Your session token is like a password, please do not reveal
                    it or share it to anyone.</span
                  >
                  <p>
                    Expired at :
                    {{
                      new Date(
                        hani_user_data.session_key_expires_at * 1000
                      ).toDateString("en")
                    }}
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn :href="`https://hanime.tv/auth?token=${hani_user_data.session_key}&expire=${hani_user_data.session_key_expires_at}&redirect=/edit-my-channel`" target="_blank">
              Edit your account
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="dialogprompt = true">
              Update data (Reauth required)
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      hani_user_data: null,
      dialogprompt: false,
      showCard: false,
      valid: true,
      errormsg: "",
      pass: "",
      passRules: [(v) => !!v || "Password is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    async updateData() {
      if (process.client) {
        localStorage.removeItem("hanime_user_data");
        window.location.reload();
      }
    },
    async loadUserData() {
      const getdata = JSON.parse(localStorage.getItem("hanime_user_data"));
      if (!getdata || getdata === null) {
        this.hani_user_data = null;
      }
      this.hani_user_data = getdata;
    },
    async login(email, password) {
      // const genRanHex = (size) =>
      //   [...Array(size)]
      //     .map(() => Math.floor(Math.random() * 16).toString(16))
      //     .join("");
      const options = {
        url: "https://hani.nsdev.ml/auth/login",
        method: "POST",
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json;charset=UTF-8",
        //   "X-Signature-Version": "web2",
        //   "X-Time": Date.now(),
        //   "X-Signature": genRanHex(32),
        // },
        data: {
          email,
          password,
        },
      };
      await axios(options)
        .then(({ data }) => {
          if (process.client) {
            const getdata = localStorage.getItem("hanime_user_data");
            if (!getdata || getdata === null) {
              const user_data = {
                user: {
                  id: data.user.id,
                  email: data.user.email,
                  ip: data.user.ip,
                  name: data.user.name,
                  slug: data.user.slug,
                  coins: data.user.coins,
                  id_num: data.user.number,
                  avatar: data.user.avatar_url,
                  premium_status: data.user.alt_premium_status,
                  updated_at: data.user.updated_at,
                  created_at: data.user.created_at,
                },
                playlist: data.playlist,
                session_key: data.session_token,
                session_key_expires_at: data.session_token_expire_time_unix,
              };
              localStorage.setItem(
                "hanime_user_data",
                JSON.stringify(user_data)
              );
              this.hani_user_data = {
                user: {
                  id: data.user.id,
                  email: data.user.email,
                  ip: data.user.ip,
                  name: data.user.name,
                  slug: data.user.slug,
                  coins: data.user.coins,
                  id_num: data.user.number,
                  avatar: data.user.avatar_url,
                  premium_status: data.user.alt_premium_status,
                  updated_at: data.user.updated_at,
                  created_at: data.user.created_at,
                },
                playlist: data.playlist,
                session_key: data.session_token,
                session_key_expires_at: data.session_token_expire_time_unix,
              };
              window.location.reload();
            } else {
              loadUserData();
              window.location.reload();
            }
          }
        })
        .catch((e) => {
          if (e.status === 401) {
            this.errormsg = "Invalid credentials :" + e.status;
          } else if (e.status === 500) {
            this.errormsg = "Something wrong with the server :" + e.status;
          }
        });
    },
  },
};
</script>
<style>
.ctn {
  display: grid;
  place-items: center;
}
.hov_t_unl {
  filter: blur(5px);
  color: black;
}
.hov_t_unl:hover {
  filter: blur(0px);
  color: white;
}
</style>
