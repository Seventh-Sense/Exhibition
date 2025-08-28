<template>
  <div class="card">
    <div class="card-title">温度历史数据</div>
    <n-data-table
      :columns="columns"
      :bordered="false"
      :data="data"
      :max-height="height - 44"
      :loading="loading"
      :row-key="(row: any) => row.key"
      size="small"
      virtual-scroll
    />
  </div>
</template>

<script setup lang="ts">
import type { DataTableColumns } from "naive-ui";
import { ref, watch } from "vue";

const props = defineProps({
  data: Array,
});

const height = ref(
  Number(document.documentElement.clientHeight) - 56 - 28 - 380 - 100
);

const columns: DataTableColumns<any> = [
  { title: "采样时间", key: "time", resizable: true },
  {
    title: "环境湿度(%RH)",
    key: "humidty",
    resizable: true,
  },
  { title: "环境人数", key: "person", resizable: true },
  { title: "环境温度(℃)", key: "temp", resizable: true },
  { title: "预测温度(℃)", key: "predict_temp", resizable: true },
];

const data = ref<any>([]);

const loading = ref(false);

watch(
  () => props.data,
  (newData) => {
    //console.log("Props data changed:", newData);
    data.value = newData;
  },
  { immediate: true }
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
}

::v-deep(.n-data-table-table) {
  background-color: transparent !important;
}

::v-deep(.n-data-table-thead) {
  background-color: transparent !important;
}

::v-deep(.n-data-table-th) {
  background-color: transparent !important;
}

::v-deep(.n-data-table-tr:hover) {
  background-color: transparent !important;
}

::v-deep(.n-data-table-td) {
  background-color: transparent !important;
}

::v-deep(.n-data-table-tbody .n-data-table-tr:nth-child(odd)) {
  background-color: rgba(255, 255, 255, 0.07) !important;
}

::v-deep(.n-data-table-td) {
  border: none !important;
}

::v-deep(.n-data-table-tbody .n-data-table-tr:nth-child(even)) {
  background-color: transparent !important;
}

::v-deep(.n-data-table-tbody .n-data-table-tr:nth-child(odd)) td:first-child {
  border-radius: 8px 0 0 8px !important;
}

::v-deep(.n-data-table-tbody .n-data-table-tr:nth-child(odd)) td:last-child {
  border-radius: 0 8px 8px 0 !important;
}
</style>
