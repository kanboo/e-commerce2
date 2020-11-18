import axios from "axios";
import { computed, ref } from "vue";

export default () => {
  let productList = ref([]);

  const normalizeProductList = computed(() => {
    return productList.value.map((item) => {
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
  });

  const fetchProduct = (activeTab) => {
    const api = `https://backend-api-1-dot-dev-handsup.df.r.appspot.com/category/${activeTab}`;
    axios
      .get(api, {
        params: {
          offset: 0,
          limit: 10,
        },
      })
      .then((response) => {
        productList.value = response?.data?.result?.items ?? [];
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { productList, normalizeProductList, fetchProduct };
};