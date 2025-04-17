<template>
  <div class="page" style="color: white">
    <div class="page-header">
      <div class="page-header-title">传感器</div>
    </div>
    <div class="page-container">
      <n-grid x-gap="14" :cols="12" style="margin-bottom: 14px">
        <n-gi :span="4" class="page-container-card filter-height">
          <Population :data="people" />
        </n-gi>
        <n-gi :span="4" class="page-container-card filter-height">
          <GaugeBlock :data="chartData[0]" />
        </n-gi>
        <n-gi :span="4" class="page-container-card filter-height"
          ><GaugeBlock :data="chartData[1]" />
        </n-gi>
      </n-grid>
      <n-grid x-gap="14" :cols="12">
        <n-gi :span="3" class="page-container-card chart-height">
          <TextBlock :data="airData[0]" />
        </n-gi>
        <n-gi :span="3" class="page-container-card chart-height"
          ><TextBlock :data="airData[1]" />
        </n-gi>
        <n-gi :span="3" class="page-container-card chart-height"
          ><TextBlock :data="airData[2]" />
        </n-gi>
        <n-gi :span="3" class="page-container-card chart-height"
          ><TextBlock :data="airData[3]" />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TextBlock } from "./components/TextBlock";
import { GaugeBlock } from "./components/GaugeBlock";
import { Population } from "./components/Population";

const people = ref(42)
const airData = ref([
  {
    name: "PM2.5",
    type: "PM2.5",
    value: 65,
    unit: "μg/m³",
    status: 1,
  },
  {
    name: "二氧化碳浓度",
    type: "CO2",
    value: 900,
    unit: "ppm",
    status: 2,
  },
  {
    name: "PM10",
    type: "PM10",
    value: 300,
    unit: "μg/m³",
    status: 3,
  },
  {
    name: "甲醛",
    type: "HCHO",
    value: 2,
    unit: "ppm",
    status: 0,
  },
]);

const chartData = ref([
  {
    name: "实时温度",
    unit: "℃",
    value: 25,
    range: [-20, 60],
  },
  {
    name: "相对湿度",
    unit: "%",
    value: 60,
    range: [-20, 60],
  },
]);
</script>

<style lang="less" scoped>
@card-first-height: 60vh;
@card-two-height: calc(100vh - @card-first-height - 56px - 14px - 14px - 14px);

.page {
  padding: 0;
  width: 100%;
  height: 100vh;
  background-image: radial-gradient(
    farthest-side at 0% 0%,
    #383477ff,
    #19162aff
  );

  &-header {
    height: 56px;
    padding: 0 12px;
    background: rgba(0, 0, 0, 0.13);
    backdrop-filter: blur(30px);
    display: flex;
    align-items: center;

    &-title {
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      text-align: left;
      font-style: normal;
    }
  }

  &-container {
    padding: 14px;

    &-card {
      background: rgba(0, 0, 0, 0.53);
      border-radius: 12px;
      backdrop-filter: blur(32px);
    }
  }
}

.filter-height {
  height: @card-first-height;
}

.chart-height {
  height: @card-two-height;
}
</style>
