<template>
  <div ref="myRef" class="card">
    <div class="card-top">
      <div class="card-top-title">
        {{ data.name }}
      </div>
      <div v-if="data.status === 0" class="card-top-desc">数据出错</div>
      <div
        v-else-if="data.status === 1"
        class="card-top-desc"
        style="color: #3bd695"
      >
        <svg-icon name="_checkCircle_TL" :size="24"></svg-icon>
        质量良好
      </div>
      <div
        v-else-if="data.status === 2"
        class="card-top-desc"
        style="color: #e9c335"
      >
        <svg-icon name="_warning_TL" :size="24"></svg-icon>
        质量一般
      </div>
      <div
        v-else-if="data.status === 3"
        class="card-top-desc"
        style="color: #f76f83"
      >
        <svg-icon name="_dismissCircle_TL" :size="24"></svg-icon>
        质量较差
      </div>
    </div>
    <div class="card-text" :style="{ height: elementHeight - 42 + 'px' }">
      <div class="card-text-value">{{ data.value }}</div>
      <div class="card-text-unit">{{ data.unit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const myRef = ref<HTMLDivElement | null>(null);

const elementHeight = ref<number>(0);

onMounted(() => {
  if (myRef.value) {
    console.log(myRef.value.offsetHeight);
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

    &-title {
      height: 36px;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      line-height: 36px;
      text-align: left;
      font-style: normal;
    }

    &-desc {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      font-style: normal;
    }
  }

  &-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-value {
      font-weight: bold;
      font-size: 60px;
      color: #ffffff;
      line-height: 87px;
      text-align: center;
      font-style: normal;
    }

    &-unit {
      font-weight: 400;
      font-size: 24px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 35px;
      text-align: center;
      font-style: normal;
    }
  }
}
</style>
