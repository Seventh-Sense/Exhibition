<template>
  <div class="card">
    <div class="card-title">空调面板</div>
    <div class="card-temp">
      <div>
        <span class="card-temp-value">{{ data.indoor_temp }}</span>
        <span class="card-temp-unit">℃</span>
      </div>
      <div class="card-temp-title">室内温度</div>
    </div>
    <div class="card-item">
      <div class="card-item-title">设定温度:</div>
      <n-input-number
        class="ainput"
        v-model:value="data.set_temp"
        button-placement="both"
        style="width: 50%"
        min="16"
        max="30"
      >
        <template #suffix>℃</template>
      </n-input-number>
    </div>
    <div class="card-item">
      <div class="card-item-title">定时开关:</div>
      <div style="display: flex;justify-content: flex-end;align-items: center;gap: 8px;">
        <n-time-picker
          :format="'HH:mm'"
          type="range"
          :time-picker-props="{
            isSecondDisabled: () => true,
          }"
          v-model:value="data.timer_switch[0]"
          @update:value="handleStrat"
        />
        <span>至</span>
        <n-time-picker
          :format="'HH:mm'"
          type="range"
          :time-picker-props="{
            isSecondDisabled: () => true,
          }"
          v-model:value="data.timer_switch[1]"
          @update:value="handleEnd"
        />
      </div>
    </div>
    <div class="card-item">
      <div class="card-item-title">风速</div>
      <div class="card-groups" style="width: 70%">
        <div
          class="card-groups-item"
          style="width: 25%"
          :class="
            data.wind_speed === 0
              ? 'card-groups-item-select'
              : 'card-groups-item-unselect'
          "
          @click="onClickWeather(0)"
        >
          自动
        </div>
        <div
          class="card-groups-item"
          style="width: 25%"
          :class="
            data.wind_speed === 1
              ? 'card-groups-item-select'
              : 'card-groups-item-unselect'
          "
          @click="onClickWeather(1)"
        >
          低
        </div>
        <div
          class="card-groups-item"
          style="width: 25%"
          :class="
            data.wind_speed === 2
              ? 'card-groups-item-select'
              : 'card-groups-item-unselect'
          "
          @click="onClickWeather(2)"
        >
          中
        </div>
        <div
          class="card-groups-item"
          style="width: 25%"
          :class="
            data.wind_speed === 3
              ? 'card-groups-item-select'
              : 'card-groups-item-unselect'
          "
          @click="onClickWeather(3)"
        >
          高
        </div>
      </div>
    </div>
    <div class="card-mode">模式</div>
    <div class="card-mode-content">
      <div class="card-mode-content-item">
        <div
          class="card-mode-content-icon"
          :class="data.mode === 1 ? 'border-color-select' : ''"
          @click="onClickMode(1)"
        >
          <svg-icon
            v-if="data.mode === 1"
            name="show_sun"
            :size="48"
          ></svg-icon>
          <svg-icon v-else name="show_sun_g" :size="36"></svg-icon>
        </div>
        <div class="card-mode-content-label">制热</div>
      </div>
      <div class="card-mode-content-item">
        <div
          class="card-mode-content-icon"
          :class="data.mode === 2 ? 'border-color-select' : ''"
          @click="onClickMode(2)"
        >
          <svg-icon
            v-if="data.mode === 2"
            name="show_snow"
            :size="48"
          ></svg-icon>
          <svg-icon v-else name="show_snow_g" :size="36"></svg-icon>
        </div>
        <div class="card-mode-content-label">制冷</div>
      </div>
      <div class="card-mode-content-item">
        <div
          class="card-mode-content-icon"
          :class="data.mode === 3 ? 'border-color-select' : ''"
          @click="onClickMode(3)"
        >
          <svg-icon
            v-if="data.mode === 3"
            name="show_fan2"
            :size="48"
          ></svg-icon>
          <svg-icon v-else name="show_fan2_g" :size="36"></svg-icon>
        </div>
        <div class="card-mode-content-label">吹风</div>
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

const handleStrat = (value: any) => {
  if (value) {
    const date = new Date(value);
    date.setSeconds(0);
    props.data.timer_switch[0] = date.getTime();
  } else {
    props.data.timer_switch[0] = null;
  }
  console.log(props.data.timer_switch[0]);
};

const handleEnd = (value: any) => {
  if (value) {
    const date = new Date(value);
    date.setSeconds(0);
    props.data.timer_switch[1] = date.getTime();
  } else {
    props.data.timer_switch[1] = null;
  }
  console.log(props.data.timer_switch[1]);
};

const onClickWeather = (data: any) => {
  props.data.wind_speed = data;
};

const onClickMode = (data: any) => {
  props.data.mode = data;
};
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

  &-temp {
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-title {
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 20px;
      text-align: left;
      font-style: normal;
    }

    &-value {
      font-weight: bold;
      font-size: 32px;
      color: #ffffff;
      line-height: 46px;
      text-align: center;
      font-style: normal;
    }

    &-unit {
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
      text-align: right;
      font-style: normal;
      margin-left: 8px;
    }
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
  }

  &-groups {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 60%;
    height: 32px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 16px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 33%;
      height: 32px;
      border-radius: 16px;
      cursor: pointer;

      font-size: 16px;
      line-height: 24px;
      text-align: left;
      font-style: normal;

      &-unselect {
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
      }

      &-select {
        font-weight: bold;
        color: #ffffff;
        background-image: radial-gradient(
          ellipse at 50% 90%,
          #00ced1 0%,
          #6666ff 70%
        );
      }
    }
  }

  &-mode {
    margin-top: 12px;
    margin-bottom: 8px;
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

.ainput::v-deep(.n-input__state-border) {
  border: 0 !important;
  box-shadow: none !important;
}

.ainput::v-deep(.n-input-wrapper) {
  background-color: #181621;
}

.ainput::v-deep(.n-input__input-el) {
  text-align: center;
  border-bottom: 1px solid rgba(102, 102, 255, 1);
}

.ainput::v-deep(.n-input__prefix) {
  height: 34px;
  margin-right: 0;
  border-bottom: 1px solid rgba(102, 102, 255, 1);
}

.ainput::v-deep(.n-input__suffix) {
  height: 34px;
  margin-left: 0;
  border-bottom: 1px solid rgba(102, 102, 255, 1);
}
</style>
