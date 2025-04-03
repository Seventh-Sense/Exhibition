<template>
  <div id="chart" style="width: 100%; height: 300px"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import uPlot from "uplot";

let u: any;

const props = defineProps({
  data: Object,
});
let xs = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
let vals = [
  -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

let data: any = [
  xs,
  xs.map((t, i) => vals[Math.floor(Math.random() * vals.length)]),
];

onMounted(() => {
  const opts: any = {
    width: 1920,
    height: 600,
    title: "Grid Over Series",
    drawOrder: ["series", "axes"],
    axes: [
      {
        grid: {
          show: true,
          stroke: "rgba(0,0,0,0.2)",
          width: 1,
        },
        ticks: {
          show: true,
          stroke: "rgba(0,0,0,0.2)",
          width: 1,
        },
      },
      {
        grid: {
          show: true,
          stroke: "rgba(0,0,0,0.2)",
          width: 1,
        },
        ticks: {
          show: true,
          stroke: "rgba(0,0,0,0.2)",
          width: 1,
        },
      },
    ],
    scales: {
      x: {
        time: false,
      },
    },
    series: [
      {},
      {
        stroke: "#D32F2F",
        fill: "#E57373",
        //	width: 5,
        points: {
          //		size: 10,
        },
      },
    ],
  };

  let sss: any = document.getElementById("chart");

  u = new uPlot(opts, [[], []], sss);

  console.log(data);
});

onUnmounted(() => {});

// 响应式更新
watch(
  () => props.data,
  (newData: any) => {
    let x: any = [];
    let y: any = [];
    newData.ai_energy.forEach((item: any) => {
      x.push(item[0]);
      y.push(item[1]);
    });

    console.log("aaaaaa", [x, y]);
    u.setData([x, y]);
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.app {
  text-align: center;
  padding: 20px;
}
</style>
