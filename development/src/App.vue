<template>
  <Map :selectedLocation="selectedLocation" @mapData="mapData = $event" />
  <Copyright :mapData="mapData" @selected="selectedLocation = $event" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Map from "@/components/Map.vue";
import Copyright from "@/components/Copyright.vue";

export default defineComponent({
  name: "App",
  components: {
    Map,
    Copyright,
  },
  data() {
    return {
      selectedLocation: "0",
      mapData: [],
    };
  },
});
</script>