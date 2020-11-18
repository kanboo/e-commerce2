import { ref } from "vue";

export default () => {
  const tabs = ["women", "men", "kids", "baby"];
  const activeTab = ref("women");

  const activeClass = (tab) => {
    return tab === activeTab.value
      ? 'border-black border-b-4 text-blue-700 hover:text-blue-700'
      : ''
  }

  return { tabs, activeTab, activeClass };
};