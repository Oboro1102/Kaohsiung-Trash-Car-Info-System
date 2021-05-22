<template>
  <div class="loading" v-if="loading">
    <transition name="scale" mode="out-in" appear>
      <div class="loading__message" v-if="haveMessage">{{ message }}</div>
      <i class="gg-loadbar-alt" v-else></i>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
    },
    haveMessage: {
      type: Boolean,
    },
    message: {
      type: String,
    },
  },
});
</script>