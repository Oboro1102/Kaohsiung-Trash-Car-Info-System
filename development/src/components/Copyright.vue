<template>
  <footer class="footer">
    <select
      class="locationSelector"
      name="locationSelector"
      v-model="selectedLocation"
      @change="$emit('selected', selectedLocation)"
    >
      <option value="0" hidden>請選擇欲查詢的區域</option>
      <option
        :value="item"
        v-for="(item, index) in trashCarInLocation"
        :key="index"
      >
        {{ item }}
      </option>
    </select>
    <div class="footer__copyright">
      &copy;&nbsp;2021<span v-if="currentYear !== 2021"
        >&nbsp;-&nbsp;{{ currentYear }}</span
      >&nbsp;Design&nbsp;&amp;&nbsp;Coding&nbsp;by&nbsp;ツキノリュウ.
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Copyright",
  props: {
    mapData: {
      type: Array,
      required: true,
    },
  },
  emits: ["selected"],
  data() {
    return {
      selectedLocation: "0",
    };
  },
  computed: {
    trashCarInLocation() {
      const location = [
        "鹽埕區",
        "鼓山區",
        "左營區",
        "楠梓區",
        "三民區",
        "新興區",
        "前金區",
        "苓雅區",
        "前鎮區",
        "旗津區",
        "小港區",
        "鳳山區",
        "林園區",
        "大寮區",
        "大樹區",
        "大社區",
        "仁武區",
        "鳥松區",
        "岡山區",
        "橋頭區",
        "燕巢區",
        "田寮區",
        "阿蓮區",
        "路竹區",
        "湖內區",
        "茄萣區",
        "永安區",
        "彌陀區",
        "梓官區",
        "旗山區",
        "美濃區",
        "六龜區",
        "甲仙區",
        "杉林區",
        "內門區",
        "茂林區",
        "桃源區",
        "那瑪夏區",
      ];
      const haveTrashCarLocation: string[] = [];

      for (let a = 0; a < location.length; a++) {
        const elementA: string = location[a];
        for (let b = 0; b < this.mapData.length; b++) {
          const elementB: any = this.mapData[b];
          if (elementB.location !== null) {
            const haveTrashCar: boolean = elementB.location.includes(elementA);
            if (haveTrashCar) {
              haveTrashCarLocation.push(elementA);
              break;
            }
          }
        }
      }

      return haveTrashCarLocation;
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
});
</script>