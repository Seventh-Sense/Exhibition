<template>
  <div ref="myRef" class="card">
    <div class="card-top">人体数量</div>
    <div class="card-text" :style="{ height: elementHeight - 42 + 'px' }">
      {{ props.data }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  data: {
    type: Number,
    required: true,
  },
});
const myRef = ref<HTMLDivElement | null>(null);
const elementHeight = ref<number>(0);

onMounted(() => {
  if (myRef.value) {
    //console.log(myRef.value.offsetHeight);
    elementHeight.value = myRef.value.offsetHeight;
  }
});
</script>

<style lang="less" scoped>
.card {
  padding: 6px 10px 0 10px;
  height: 100%;

  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    font-weight: bold;
    font-size: 16px;
    color: #ffffff;
    line-height: 24px;
    text-align: left;
    font-style: normal;
  }

  &-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 60px;
    color: #ffffff;
    line-height: 87px;
    text-align: center;
    font-style: normal;
  }
}
</style>
