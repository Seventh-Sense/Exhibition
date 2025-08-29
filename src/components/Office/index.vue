<template>
  <div class="page" style="color: white">
    <div class="page-container">
      <div class="page-info">
        <div class="page-top">因素</div>
        <div class="page-item">
          <div class="page-title">当前温度</div>
          <div class="page-value">{{ formData.temp }} ℃</div>
        </div>
        <div class="page-item">
          <div class="page-title">预测温度</div>
          <div class="page-value">{{ formData.predict_temp }} ℃</div>
        </div>
        <div class="page-item">
          <div class="page-title">人数</div>
          <div class="page-value">{{ formData.person }}</div>
        </div>
        <div class="page-item">
          <div class="page-title">湿度</div>
          <div class="page-value">{{ formData.humidity }} %RH</div>
        </div>
        <div class="page-item">
          <div class="page-title">天气</div>
          <div class="page-value">{{ weatherTrans(formData.weather) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import bus from "../../utils/eventBus";

const props = defineProps({
  data: Object,
});

const formData = reactive<any>({
  weather: 1,
  humidity: 26,
  person: 2,
  temp: 23,
  predict_temp: 23,
});

onMounted(() => {
  bus.on("environment", (val: any) => {
    formData.weather = val.weather;
    formData.person = val.person;
    formData.humidity = val.humidity;
  });

  bus.on("history_data", (val: any) => {
    if (val.length > 0) {
      let length = val.length;
      formData.temp = val[length - 1].temp;
      formData.predict_temp = val[length - 1].predict_temp;
    }

    //console.log("formData", formData);
  });
});

onUnmounted(() => {
  bus.off("environment");
  bus.off("history_data");
});

const weatherTrans = (data: any) => {
  switch (data) {
    case 1:
      return "晴天";
    case 2:
      return "小雨";
    case 3:
      return "阴天";
    case 4:
      return "多云";
    default:
      return "未知";
  }
};
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
    background-image: url("@/assets/Small3-banner2.gif");
    //background-image: url("@/assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }

  &-info {
    background-color: rgba(0, 0, 0, 0.53);
    border-radius: 6px;
    width: 190px;
    height: 190px;
    position: absolute;
    top: 30px;
    left: 40px;
  }

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    padding: 0 6px;
  }

  &-title {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 20px;
    text-align: left;
    font-style: normal;
  }

  &-value {
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    text-align: right;
    font-style: normal;
  }

  &-top {
    height: 28px;
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 20px;
    text-align: left;
    font-style: normal;
    padding: 0 6px;
    display: flex;
    align-items: center;
  }
}
</style>
