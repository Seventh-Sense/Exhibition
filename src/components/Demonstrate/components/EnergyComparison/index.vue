<template>
  <div class="card">
    <div class="card-title">温度对比</div>

    <div ref="chartDom" class="card-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts/core";
import type { ECharts } from "echarts/core";
import {
  LegendComponent,
  TooltipComponent,
  GridComponent,
  TitleComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";

const props = defineProps({
  data: Array,
});

echarts.use([
  SVGRenderer,
  LineChart,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  LabelLayout,
  UniversalTransition,
  TitleComponent,
  DatasetComponent,
  TransformComponent,
]);

const chartDom = ref<HTMLElement>();
let chartInstance: ECharts | null = null;

const options = ref<any>({
  legend: {
    top: 10,
    orient: 'horizontal',
    itemGap: 200,
    textStyle: {
      color: "rgba(255,255,255,0.53)",
    }
    
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(40,40,40,0.9)",
    borderColor: "#555",
    axisPointer: {
      type: "cross",
      lineStyle: {
        color: "#666",
      },
    },
    textStyle: {
      color: "#fff",
    },
  },
  xAxis: {
    show: true,
    type: "time",
    splitLine: {
      show: false,
    },
    axisTick: { show: false },
    axisLine: {
      show: true,
      lineStyle: {
        width: 3,
        color: "rgba(255,255,255,0.2)",
        type: "solid",
      },
    },
    axisLabel: {
      color: "rgba(255,255,255,0.53)",
      margin: 16,
    },
  },
  yAxis: {
    type: "value",
    min: 16.0,
    axisLine: {
      show: false,
    },
    axisTick: { show: false },
    axisLabel: {
      color: "rgba(255,255,255,0.53)",
      margin: 16,
      formatter: (value: number) => value.toFixed(1),
    },
    splitLine: {
      show: true,
      showMinLine: false,
      lineStyle: {
        color: "rgba(255,255,255,0.2)",
        type: "dashed",
      },
    },
  },
  series: [
    {
      name: "环境温度",
      type: "line",
      data: [],
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#6666FF",
        width: 2,
      },
      itemStyle: { color: "#6666FF" },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#6666FF" },
          { offset: 1, color: "rgba(0, 0, 0, 0)" },
        ]),
      },
    },
    {
      name: "预测温度",
      type: "line",
      data: [],
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#00CED1 ",
        width: 2,
      },
      itemStyle: { color: "#00CED1" },
    },
  ],
  grid: {
    top: 80,
    bottom: 30,
    left: 50,
    right: 30,
  },
  backgroundColor: "#181621",
  animation: false,
  hardwareAcceleration: false,
});

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance?.dispose();
});

// 初始化图表
const initChart = () => {
  if (chartDom.value) {
    chartInstance = echarts.init(chartDom.value, "#181621");
    chartInstance.setOption(options.value);
  }
};

const dataHandle = (data: any) => {
  if (data.length === 0) {
    return { predict_temp: [], temp: [] };
  }

  const temp: Array<[any, number]> = [];
  const predict_temp: Array<[any, number]> = [];

  // 第一个元素的特殊处理
  const firstItem = data[0];
  temp.push([firstItem.time, firstItem.temp]);
  predict_temp.push([firstItem.time, firstItem.predict_temp]);

  // 从第二个元素开始循环
  for (let i = 1; i < data.length; i++) {
    const current = data[i];
    const prev = data[i - 1];

    temp.push([current.time, current.temp]);
    predict_temp.push([current.time, prev.predict_temp]);
  }

  console.log("predict_temp", predict_temp);
  return { predict_temp, temp };
};

watch(
  () => props.data,
  (newData) => {
    //console.log("temp", newData);
    const data = dataHandle(newData);
    //handle data update
    chartInstance?.setOption({
      series: [
        {
          data: data.temp,
        },
        {
          data: data.predict_temp,
        },
      ],
    });
  },
  { immediate: true, deep: true }
);

// 窗口自适应
const handleResize = () => chartInstance?.resize();
window.addEventListener("resize", handleResize);
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
