<script lang="ts">
import { getToday, toBase64, shimmer } from "@wanin/utils";

export default {
  name: "MainNav",
  props: {
    title: {
      type: String,
      required: false,
      default: "遊戲打亂鬥",
    },
  },
  data() {
    return {
      today: getToday(),
      isLoading: false,
    };
  },
  methods: {
    toBase64,
    shimmer,
  },
};
</script>

<template>
  <nav
    class="w-bg-secondary w-screen flex h-[65px] items-center top-0 fixed justify-center z-50 shadow-lg shadow-gray-200 dark:shadow-none dark:border-b dark:border-gray-700">
    <div class="flex container w-[100%]">
      <div class="flex items-center w-[30%] justify-start">
        <NuxtLink to="/">
          <nuxt-img
            :src="
              isLoading
                ? `data:image/svg+xml;base64,${toBase64(shimmer(250, 78))}`
                : 'logo-2.png'
            "
            format="webp"
            quality="80"
            :class="`w-full h-auto max-w-[100px] transition-all duration-300 ${
              isLoading ? 'blur-lg' : 'blur-none'
            }`"
            :alt="title"
            @load="isLoading === true" />
        </NuxtLink>
      </div>
      <ul class="flex items-center w-[70%] justify-end mr-3 gap-3">
        <li>
          <NuxtLink to="/about"> 關於 </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact"> 聯絡 </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
