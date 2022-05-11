<template>
  <div class="d-inline-flex items-center" v-if="crumbs.length != 0">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          text
          plain
          fab
          v-bind="attrs"
          v-on="on"
          @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <span>Back</span>
    </v-tooltip>
    <v-breadcrumbs class="py-0" :items="crumbs"></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "HanimeDesktop"
    };
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.substring(1).split('/')
      params.pop()
      const crumbs = []
      let path = ''
    
      params.forEach((param, index, { length }) => {
        path = `/${param}`
        const match = this.$router.match(path)
        console.log(path + ' ' + fullPath)
        if (match.name !== 'index') {
          if (index === length - 1) {
            crumbs.push({
              text: path.replace(/\//g, '-').slice(1),
              disabled: true,
            })
          } else {
            crumbs.push({
              text: path.replace(/\//g, '-').slice(1),
              disabled: true,
            })
          }
        }
      })
      return crumbs
    },
  },
}
</script>
