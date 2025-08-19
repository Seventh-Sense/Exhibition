<template>
  <div class="card">
    <div class="card-top">
      <div class="card-top-title">AI预测温度</div>
      <div class="card-top-contant">
        <div>
          <div>
            <span class="card-top-value">{{ value }}</span>
            <span class="card-top-unit">℃</span>
          </div>
          <div class="card-top-text">预测平均温度</div>
        </div>
      </div>
    </div>

    <div class="card-buttons">
      <div class="card-icons">
        <svg-icon name="show_refresh_g" :size="48" @click="onReset"></svg-icon>
      </div>
      <div class="card-icons" :class="!isShow ? 'border-color-select' : ''">
        <svg-icon
          v-if="isShow"
          name="show_start"
          :size="48"
          @click="onClick"
        ></svg-icon>
        <svg-icon
          v-else
          name="show_pause"
          :size="48"
          @click="onClick"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { Methods, MY_FUNCTIONS_KEY } from "../../until/until";
import { sendParams } from "../../../../utils/http";
import { message } from "ant-design-vue";

const props = defineProps({
  device_id: {
    type: String,
    required: true,
  },
  tradition: {
    type: Object,
    required: true,
  },
  indoorTemp: {
    type: String,
    required: true,
  }
});

const value = ref<any>(25);
let interval: number;
const isShow = ref(true);

const myFunctions = inject(MY_FUNCTIONS_KEY);

const getValue = () => {
  sendParams(props.device_id, {
    function: "get_aitemp",
    parms: {},
  })
    .then((res: any) => {
      if (res.status === "OK" && res.data.status === "OK") {
        value.value = parseFloat(res.data.value).toFixed(1);
        console.log("get_aitemp", res.data.value);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const onClick = () => {
  if (isShow.value) {
    if (dataCheck()) {
      myFunctions?.submit();

      interval = window.setInterval(() => {
        getValue();
      }, 5000);

      isShow.value = false;
    } else {
      isShow.value = true;
    }
  } else {
    window.clearInterval(interval);
    myFunctions?.reset();

    isShow.value = true;
  }
};

const dataCheck = () => {
  let flag = true;

  console.log(props.tradition.setTemp, props.indoorTemp)
  if (props.tradition.mode[1] === 1) {
    if (props.tradition.setTemp < parseFloat(props.indoorTemp)) {
      message.error("当前制热模式下，请检查设定温度！");
      flag = false;
    }
  }

  if (props.tradition.mode[2] === 1) {
    if (props.tradition.setTemp > parseFloat(props.indoorTemp)) {
      message.error("当前制冷模式下，请检查设定温度！");
      flag = false;
    }
  }

  return flag;
};

const onReset = () => {
  window.clearInterval(interval);
  isShow.value = true;
  myFunctions?.reset();
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url("@/assets/show_background.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  &-top {
    height: 214px;

    &-title {
      height: 32px;
      margin-top: 6px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      text-align: left;
      font-style: normal;
      padding: 0 12px;
    }

    &-contant {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 170px;
    }

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
      font-size: 20px;
      color: #ffffff;
      line-height: 29px;
      text-align: right;
      font-style: normal;
      margin-left: 4px;
    }

    &-text {
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 20px;
      text-align: center;
      font-style: normal;
    }
  }

  &-buttons {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &-icons {
    width: 70px;
    height: 70px;
    background: rgba(255, 255, 255, 0.13);
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.border-color-select {
  border: 1px solid #8c8cff;
}
</style>
