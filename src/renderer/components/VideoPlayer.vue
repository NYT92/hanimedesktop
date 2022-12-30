<template>
  <div ref="artRef"></div>
</template>

<script>
import Artplayer from "artplayer";
export default {
  data() {
    return {
      instance: null,
    };
  },
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.instance = new Artplayer({
      ...this.option,
      container: this.$refs.artRef,
      icons: {
        loading: '<img width="100px" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjMxMmQiIHN0cm9rZS13aWR0aD0iOSIgcj0iMzIiIHN0cm9rZS1kYXNoYXJyYXk9IjE1MC43OTY0NDczNzIzMTAwNyA1Mi4yNjU0ODI0NTc0MzY2OSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiBrZXlUaW1lcz0iMDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPgo8L3N2Zz4=">',
        state: "",
      },
      playerInline: true,
      autoSize: true,
      setting: true,
      fullscreen: true,
      fullscreenWeb: true,
      playbackRate: true,
      fastForward: false,
      autoOrientation: true,
      autoMini: false,
      customType: {
        m3u8: async function (video, url) {
          const { default: Hls } = await import("hls.js");
          console.log("HLS WORKING...");
          if (Hls.isSupported()) {
            window.hls = new Hls();
            window.hls.loadSource(url);
            window.hls.attachMedia(video);
          } else {
            const canPlay = video.canPlayType("application/vnd.apple.mpegurl");
            if (canPlay === "probably" || canPlay == "maybe") {
              video.src = url;
              console.log("NO HLS");
            } else {
              window.art.notice.show = "Does not support playback of m3u8";
              console.log("HLS NOT F WORKING...");
            }
          }
        },
      },
    });
    this.$nextTick(() => {
      this.$emit("get-instance", this.instance);
    });
  },
  beforeUnmount() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy(false);
    }
  },
};
</script>
