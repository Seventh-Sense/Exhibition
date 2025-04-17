<template>
  <div ref="myRef" class="card">
    <div class="card-top">{{ data.name }}</div>
    <div class="card-text" :style="{ height: elementHeight - 42 + 'px' }">
      <a-progress
        type="dashboard"
        :percent="dataHandle(data.value)"
        :size="elementHeight - 150"
        stroke-linecap="round"
        :stroke-color="{
          '0%': '#00CED1',
          '100%': '#6666FF',
        }"
        trail-color="rgba(255,255,255,0.2)"
        :gapDegree="90"
        :strokeWidth="9"
      >
        <template #format="percent">
          <div class="card-text-value">
            {{ data.value }}
          </div>
          <div class="card-text-unit">
            {{ data.unit }}
          </div>
        </template>
      </a-progress>
      <div class="label" :style="{ width: elementHeight - 150 + 'px' }">
        <div class="label-text left">-20</div>
        <div class="label-text right">60</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { computed } from "vue";

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
    myRef.value.style.setProperty("--label-offset", labelOffset.value);
  }
});

const labelOffset = computed(() => {
  return `${(elementHeight.value - 150) * 0.06}px`; // 基于仪表盘尺寸计算偏移量
});

const dataHandle = (newData: any) => {
  let range = props.data.range[1] - props.data.range[0] ;

  console.log('range', range)
  return (Math.abs(props.data.range[0] - newData) * 100) / range;
};

window.addEventListener("resize", () => {
  if (myRef.value) {
    elementHeight.value = myRef.value.offsetHeight;
    myRef.value.style.setProperty("--label-offset", labelOffset.value);
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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-value {
      font-weight: bold;
      font-size: 72px;
      color: #ffffff;
      line-height: 105px;
      text-align: center;
      font-style: normal;
    }

    &-unit {
      font-weight: 400;
      font-size: 36px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 52px;
      text-align: center;
      font-style: normal;
    }
  }
}

.label {
  position: relative; // 关键定位容器
  height: 0; // 不占用垂直空间
  margin-top: -10%; // 动态间距

  &-text {
    position: absolute;
    font-size: clamp(12px, 1.5vw, 24px); // 响应式字号
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    transform: translateY(-50%);

    &.left {
      left: calc(1 * (var(--label-offset))); // 动态左偏移
    }
    &.right {
      right: calc(1 * (var(--label-offset))); // 动态右偏移
    }
  }
}
</style>
