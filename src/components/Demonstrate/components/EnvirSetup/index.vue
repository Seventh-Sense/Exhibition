<template>
  <div class="card">
    <div class="card-title">环境因素</div>
    <div class="card-item">
      <div class="card-item-title">环境人数:</div>
      <div class="card-item-data">{{ data.person }} 人</div>
    </div>
    <div class="card-item">
      <div class="card-item-title">环境湿度:</div>
      <div class="card-item-data">{{ data.humidity }} %RH</div>
    </div>
    <div class="card-item">
      <div class="card-item-title">最低温度:</div>
      <div class="card-item-data">{{ data.low_temp }} ℃</div>
    </div>
    <div class="card-item">
      <div class="card-item-title">最高温度:</div>
      <div class="card-item-data">{{ data.high_temp }} ℃</div>
    </div>
    <div class="card-wather">天气</div>
    <div class="card-wather-content">
      <div class="card-wather-content-item">
        <div
          class="card-wather-content-icon"
          :class="data.weather === 1 ? 'border-color-select' : ''"
        >
          <svg-icon
            v-if="data.weather === 1"
            name="show_sun"
            :size="36"
          ></svg-icon>
          <svg-icon v-else name="show_sun_g" :size="36"></svg-icon>
        </div>
        <div class="card-wather-content-label">晴天</div>
      </div>
      <div class="card-wather-content-item">
        <div
          class="card-wather-content-icon"
          :class="data.weather === 2 ? 'border-color-select' : ''"
        >
          <svg-icon
            v-if="data.weather === 2"
            name="_rainLight_TF"
            :size="36"
          ></svg-icon>
          <svg-icon v-else name="_rainLight_TL" :size="36"></svg-icon>
        </div>
        <div class="card-wather-content-label">小雨</div>
      </div>
      <div class="card-wather-content-item">
        <div
          class="card-wather-content-icon"
          :class="data.weather === 3 ? 'border-color-select' : ''"
        >
          <svg-icon
            v-if="data.weather === 3"
            name="_overcast_TF"
            :size="36"
          ></svg-icon>
          <svg-icon v-else name="_overcast_TL" :size="36"></svg-icon>
        </div>
        <div class="card-wather-content-label">阴天</div>
      </div>
      <div class="card-wather-content-item">
        <div
          class="card-wather-content-icon"
          :class="data.weather === 4 ? 'border-color-select' : ''"
        >
          <svg-icon
            v-if="data.weather === 4"
            name="_cloudy_TF"
            :size="36"
          ></svg-icon>
          <svg-icon v-else name="_cloudy_TL" :size="36"></svg-icon>
        </div>
        <div class="card-wather-content-label">多云</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 6px 12px 0 12px;

  &-title {
    height: 32px;
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

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    margin-top: 12px;

    &-title {
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 20px;
      text-align: left;
      font-style: normal;
    }

    &-data {
      width: 50%;
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      text-align: left;
      font-style: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    }
  }

  &-wather {
    margin-top: 16px;
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 20px;
    text-align: left;
    font-style: normal;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &-icon {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.13);
        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 50%;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }

      &-label {
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
        line-height: 17px;
        text-align: center;
        font-style: normal;
      }
    }
  }
}

.border-color-select {
  border: 1px solid #8c8cff;
}
</style>
