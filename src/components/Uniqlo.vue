<template>
  <div
    class="flex flex-col justify-center items-start space-y-8 md:flex-row md:space-x-5 md:space-y-0"
  >
    <div class="border border-red mt-8 md:mt-10">
      <iframe
        width="360"
        height="640"
        src="https://handsup.shop/wego/live/22179"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        scrolling="no"
      ></iframe>
    </div>
    <div class="flex-1 max-w-2xl">
      <ul class="flex px-2 border-b mb-2">
        <li class="-mb-px mr-1 text-center" v-for="tab in tabs" :key="tab">
          <a
            class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-800 font-semibold cursor-pointer"
            :class="{
              'border-black border-b-4 text-blue-700 hover:text-blue-700':
                tab === activeTab,
            }"
            @click="handleTab(tab)"
            >{{ tab.toUpperCase() }}</a
          >
        </li>
      </ul>
      <ul
        class="product-list overflow-y-scroll w-full flex justify-start items-stretch flex-wrap"
      >
        <li
          v-for="product in normalizeProduct"
          :key="product.imageUrl"
          class="flex flex-col justify-start items-start w-40 mx-2 mb-3 md:w-48"
        >
          <div
            class="w-full mx-auto bg-gray-400 h-48 bg-top bg-cover mb-1 md:w-48"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>

          <div
            class="w-full flex justify-start items-center text-sm text-gray-600 mb-1"
          >
            <span>{{ product.genderName }}</span>
            <span class="ml-auto">{{ product.sizeRange }}</span>
          </div>

          <p class="font-black">{{ product.name }}</p>

          <span class="text-xs text-gray-700 mt-auto">{{ product.flags }}</span>
          <p class="text-lg font-black">{{ product.price }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Uniqlo",

  data() {
    return {
      tabs: ["women", "men", "kids", "baby"],
      activeTab: "women",
      offset: 0,
      items: [],
    };
  },

  computed: {
    normalizeProduct() {
      return this.items.map((item) => {
        const displayKey = item?.colors?.[0]?.["displayCode"];

        const imageUrl = item?.images?.main?.[displayKey]?.image;

        const minSize = item.sizes[0]["name"];
        const maxSize = item.sizes[item.sizes.length - 1]["name"];
        const sizeRange =
          minSize === maxSize ? `${minSize}` : `${minSize}-${maxSize}`;

        const flags = item.representative.flags.productFlags.map((flag) => {
          return flag.name;
        });

        const priceSymbol = item.prices?.base?.currency?.symbol ?? "$";
        const priceValue = item.prices?.base?.value ?? "0";
        const price = `${priceSymbol}${priceValue}`;

        return {
          imageUrl,
          genderName: item.genderName,
          sizeRange,
          name: item.name,
          flags: flags.join(", "),
          price,
        };
      });
    },
  },

  created() {
    this.fetchProduct();
  },

  methods: {
    fetchProduct() {
      const api = `https://backend-api-1-dot-dev-handsup.df.r.appspot.com/category/${this.activeTab}`;
      axios
        .get(api, {
          params: {
            offset: 0,
            limit: 10,
          },
        })
        .then((response) => {
          console.log(response);
          const items = response?.data?.result?.items ?? [];
          this.items = items;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleTab(tab) {
      this.activeTab = tab;
      this.offset = 0;
      this.items = [];

      this.fetchProduct();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (min-width: 768px) {
  .product-list {
    height: calc(100vh - 175px);
  }
}
</style>
