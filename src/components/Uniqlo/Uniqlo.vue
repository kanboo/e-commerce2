<script>
import ClassTab from "./composables/ClassTab";
import ClassProduct from "./composables/ClassProduct";
import { onMounted } from "vue";

export default {
  name: "Uniqlo",

  setup() {
    const { tabs, activeTab, activeClass } = ClassTab();
    const { productList, normalizeProductList, fetchProduct } = ClassProduct();

    const handleTab = (tab) => {
      activeTab.value = tab;
      productList.value = [];

      fetchProduct(activeTab.value);
    };

    onMounted(() => fetchProduct(activeTab.value));

    return {
      tabs,
      activeTab,
      activeClass,
      handleTab,

      normalizeProductList,
    };
  },
};
</script>

<template lang="pug" src="./Uniqlo.pug">
</template>
<style lang="scss" src="./Uniqlo.scss" scoped></style>