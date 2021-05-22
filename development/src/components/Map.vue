<template>
  <Loading :loading="loading" :haveMessage="haveMessage" :message="message" />
  <main id="map"></main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import L from "leaflet";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  name: "Map",
  components: {
    Loading,
  },
  props: {
    selectedLocation: {
      type: String,
      required: true,
    },
  },
  emits: ["mapData"],
  data() {
    return {
      mapData: [],
      markers: [],
      loading: false,
      haveMessage: false,
      message: "",
    };
  },
  computed: {
    map() {
      return L.map("map", {
        center: [22.621045, 120.311952],
        zoom: 12.5,
      });
    },
    icon() {
      return L.divIcon({
        className: "divIcon",
        html: "<div class='icon'><i class='fas fa-truck-moving'></i></div>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        tooltipAnchor: [10, -20],
      });
    },
  },
  watch: {
    selectedLocation() {
      if (this.selectedLocation !== "0") {
        this.showMarker();
      }
    },
  },
  methods: {
    getTrachCarData() {
      const api =
        "https://api.kcg.gov.tw/api/service/Get/aaf4ce4b-4ca8-43de-bfaf-6dc97e89cac0";

      this.loading = true;
      axios({
        method: "get",
        url: api,
        headers: { "Content-Type": "application/json" },
      })
        .then((response: any) => {
          this.mapData = response.data.data;
          this.loading = false;
          return this.$emit("mapData", this.mapData);
        })
        .catch((error: any) => {
          this.haveMessage = true;
          this.message = "高雄市政府提供的 API 服務暫時無法使用，請稍後再試。";
          return console.warn(error);
        });
    },
    callMap() {
      return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    setMarker(
      x: number,
      y: number,
      car: string,
      location: string,
      time: string
    ) {
      let content: string = `<p class="info__content">車牌：${car}</p><p class="info__content">所在地：${location}</p><p class="info__content">更新時間：${
        time.split("T")[1]
      }</p>`;

      return this.markers.push(
        L.marker([x, y], { icon: this.icon }).bindTooltip(content) as never
      );
    },
    removeMarker() {
      L.layerGroup(this.markers).eachLayer((element: any) => {
        element.removeFrom(this.map);
      });

      return (this.markers.length = 0);
    },
    jumpToMap(index: number, zoom: number) {
      this.map.flyTo(
        [
          Number((this.markers[index] as any)._latlng.lat),
          Number((this.markers[index] as any)._latlng.lng),
        ],
        zoom
      );
    },
    showMarker() {
      const locationData = this.mapData.filter((item: any) => {
        if (item.location !== null) {
          return item.location.includes(this.selectedLocation) as string;
        }
      });

      this.removeMarker();
      locationData.forEach((element: any) => {
        this.setMarker(
          Number(element.y),
          Number(element.x),
          element.car,
          element.location,
          element.time
        );
      });

      L.layerGroup(this.markers).addTo(this.map);

      if (this.markers.length > 1) {
        return this.jumpToMap(Math.ceil(this.markers.length / 2), 14);
      } else {
        return this.jumpToMap(0, 14);
      }
    },
  },
  created() {
    this.getTrachCarData();
  },
  mounted() {
    this.callMap();

    window.setInterval(() => {
      this.getTrachCarData();
    }, 1000 * 60 * 5);
  },
});
</script>