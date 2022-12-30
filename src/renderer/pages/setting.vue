<template>
  <div class="ctn">
    <v-dialog v-model="dialog" persistent width="380px">
      <v-card>
        <v-card-title class="text-h5"> {{ dialogmsg }} </v-card-title>
        <v-card-text> {{ dialogtext }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            {{ dialogrefuse }}
          </v-btn>
          <v-btn
            v-if="dialogmsg == 'New updates available!'"
            color="green darken-1"
            text
            @click="dialog = false"
            href="https://github.com/nyt92/hanimedesktop/releases/latest "
            target="_blank"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarmsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card class="" min-width="900">
      <v-card-title>
        <v-icon>mdi-settings</v-icon>
        <h1 class="headline">Settings</h1>
      </v-card-title>
      <v-list subheader two-line flat>
        <v-subheader>User Controls</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Save current playback </v-list-item-title>
            <v-list-item-subtitle
              >Save your playback from each video.</v-list-item-subtitle
            > </v-list-item-content
          ><v-list-item-action>
            <v-checkbox
              v-model="savecurrentplay"
              :input-value="savecurrentplay"
              color="primary"
            ></v-checkbox>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Set default video resolution</v-list-item-title>
            <v-list-item-subtitle
              >Set your player default video stream
              resolution.</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-select
              v-model="default_resolution"
              :items="resol_strm"
              label="Video resolution"
              dense
              outlined
            ></v-select>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Stream via VLC</v-list-item-title>
            <v-list-item-subtitle>
              Stream hanime content using VLC stream
            </v-list-item-subtitle>
            <v-text-field
              class="mt-4"
              v-model="filepathvlc"
              outlined
              label="VLC location"
              prepend-icon="mdi-vlc"
              append-outer-icon="mdi-folder"
              readonly
              @click:append-outer="findVLC"
              :value="filepathvlc"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn @click="savesetting"> Save Settings </v-btn>
        </v-list-item>
      </v-list>
      
      <v-divider></v-divider>

      <v-list flat subheader three-line>
        <v-subheader>About Application</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Current Version</v-list-item-title>
            <v-list-item-subtitle>{{ curr_version }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>API Version</v-list-item-title>
            <v-list-item-subtitle v-if="apiver">{{
              apiver
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Check update</v-list-item-title>
            <v-list-item-subtitle>
              <v-btn dark @click="checkup" :loading="loading">
                <v-icon>mdi-update</v-icon>
                Check Updates
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Social</v-list-item-title>
            <v-list-item-subtitle>
              <v-btn href="https://nsdev.ml/project/hanimedesktop" target="_blank">
                <v-icon>mdi-earth</v-icon>
                Website
              </v-btn>
              <v-btn href="https://github.com/nyt92/hanimedesktop" target="_blank">
                <v-icon>mdi-github</v-icon>
                Github
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ghdata: null,
      default_resolution: "720",
      resol_strm: ["720", "480", "360"],
      filepathvlc: "",
      savecurrentplay: true,
      snackbarmsg: "",
      curr_version: "v1.1.0",
      updata: null,
      apiver: null,
      dialog: false,
      dialogmsg: "",
      dialogtext: "",
      dialogrefuse: "No",
      snackbar: false,
      timeout: 2200,
      loading: false,
    };
  },
  methods: {
    findVLC() {
      var ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.send("openFileFindVLC");
      ipcRenderer.on("filepath", (e, filepath) => {
        console.log(filepath);
        if (filepath[0].includes("\\vlc.exe") === false) {
          this.dialog = true;
          this.dialogtext = "Not the right file!";
          this.dialogmsg = "Only VLC.exe can be input.";
          this.dialogrefuse = "Ok";
        } else {
          this.filepathvlc = filepath[0];
        }
      });
    },
    savesetting() {
      if (process.client) {
        const data = {
          settings: {
            save_current_play: this.savecurrentplay,
            default_resolution: this.default_resolution,
            vlcpath: this.filepathvlc,
          },
        };
        localStorage.setItem("user_setting_data", JSON.stringify(data));
        this.snackbar = true;
        this.snackbarmsg = "Saved!";
      }
    },
    loadsetting() {
      if (process.client) {
        const getdata = JSON.parse(localStorage.getItem("user_setting_data"));
        if (!getdata || getdata === null) {
          this.filepathvlc = '';
          this.savecurrentplay = true;
          this.default_resolution = '720';
        } else {
          console.log("LOADED");
          this.filepathvlc = getdata.settings.vlcpath;
          this.savecurrentplay = getdata.settings.save_current_play;
          this.default_resolution = getdata.settings.default_resolution;
        }
      }
    },
    async checkup() {
      this.loading = true;
      await axios
        .get("https://api.github.com/repos/nyt92/hanimedesktop/releases/latest")
        .then((response) => {
          if (response.data.tag_name === this.curr_version) {
            this.snackbar = true;
            this.snackbarmsg = "You have updated to the latest version.";
            this.loading = false;
          } else {
            this.dialog = true;
            this.loading = false;
            this.dialogtext = "Do you want to update HanimeDesktop Now?";
            this.dialogmsg = "New updates available!";
            this.dialogrefuse = "No";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    await this.checkup();
    await this.loadsetting();
    await axios.get("https://hani.nsdev.ml").then((res) => {
      this.apiver = res.data.Version;
    });
    await axios
      .get("https://api.github.com/users/nyt92")
      .then((res) => {
        this.ghdata = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get("https://api.github.com/repos/nyt92/hanimedesktop/releases/latest")
      .then((res) => {
        this.updata = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style>
.ctn {
  display: grid;
  place-items: center;
}
</style>
