<template>
  <div>
    <div v-if="$fetchState.pending" class="d-flex justify-center align-center" style="height:100vh;">
      <v-progress-circular indeterminate size="50" color="primary"></v-progress-circular>
    </div>
    <div
      v-else-if="$fetchState.error"
      style="display: grid; place-items: center"
    >
      Error
    </div>
    <div v-else>
      <div class="ma-5">
        <h2 class="ma-5">Recently Uploaded</h2>
        <div class="media-scrolling snaps-inline">
          <div v-for="data in recent.results" :key="data.id">
            <router-link :to="'/watch/' + data.slug">
              <div class="media-container">
                <img :src="data.cover_url" :alt="data.slug" />
                <p>{{ data.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <h2 class="ma-5">Newely Uploaded</h2>
        <div class="media-scrolling snaps-inline">
          <div v-for="data in newest.results" :key="data.id">
            <router-link :to="'/watch/' + data.slug">
              <div class="media-container">
                <img :src="data.cover_url" :alt="data.slug" />
                <p>{{ data.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <h2 class="ma-5">Trending</h2>
        <div class="media-scrolling snaps-inline">
          <div v-for="data in trend.results" :key="data.id">
            <router-link :to="'/watch/' + data.slug">
              <div class="media-container">
                <img :src="data.cover_url" :alt="data.slug" />
                <p>{{ data.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recent: null,
      newest: null,
      trend: null,
    };
  },
  async fetch() {
    this.recent = await fetch("https://hani.nsdev.ml/getLanding/recent")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    this.newest = await fetch("https://hani.nsdev.ml/getLanding/newest")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    this.trend = await fetch("https://hani.nsdev.ml/getLanding/trending")
      .then((res) => res.json())
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
  margin: 0.5rem;
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
