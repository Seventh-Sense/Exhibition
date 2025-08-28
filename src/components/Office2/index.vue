<template>
  <div class="page" style="color: white">
    <div class="page-container"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: Object,
});
</script>

<style lang="less" scoped>

.page {
  padding: 0;
  width: 100%;
  height: 100vh;
  background-image: radial-gradient(
    farthest-side at 0% 0%,
    #383477ff,
    #19162aff
  );

  &-container {
    height: 100vh;
    background-image: url("@/assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
