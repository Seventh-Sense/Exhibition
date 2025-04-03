<!-- EChartsWrapper.vue -->
<template>
  <div class="card">
    <div class="card-title">温度对比折线图</div>

    <div id="chartDom" class="card-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Chart } from "@antv/g2";

const props = defineProps({
  data: Object,
});

let chart: any = null;

const data: any[] = [];

onMounted(() => {
  chart = new Chart({
    container: "chartDom",

    autoFit: true,
  });

  chart.options({
    type: "line",
    data: [
      
    ],
    encode: { x: "year", y: "value" },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    style: {
      stroke: "skyblue",
      strokeOpacity: 0.9,
      lineWidth: 4,
      lineDash: [4, 8],
      opacity: 0.9,
      shadowColor: "#d3d3d3",
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      cursor: "pointer",
    },
  });
    
    
   
  chart.theme({ type: "classicDark" });


  chart.render();
});

onUnmounted(() => {});

// 响应式更新
watch(
  () => props.data,
  (newData: any) => {
    let data: any = [];
    newData.ai_energy.forEach((item: any) => {
      data.push({ year: item[0], value: item[1] });
    });

    //console.log(data);
    chart.changeData(data);
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 6px 12px 10px 12px;

  &-title {
    height: 40px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    color: #ffffff;
    line-height: 24px;
    text-align: left;
    font-style: normal;
  }

  &-chart {
    height: calc(100vh - 316px - 98px - 40px - 6px - 10px - 6px);
    width: 100%;
  }
}
</style>
