<template>
  <div class="card">
    <div class="card-title">空调面板</div>
    <n-grid x-gap="14" :cols="12">
      <n-gi :span="4">
        <div class="card-temp">
          <div>
            <div>
              <span class="card-temp-number">{{value}}</span>
              <span class="card-temp-unit">℃</span>
            </div>
            <div class="card-bottom-title">室内温度</div>
          </div>
        </div>
      </n-gi>

      <n-gi :span="8">
        <div class="card-setting">
          <div class="card-bottom-title">设定温度:</div>
          <n-input-number
            v-model:value="data.setTemp"
            button-placement="both"
            style="width: 65%"
            min="16"
            max="30"
          >
            <template #suffix>℃</template>
          </n-input-number>
        </div>
        <div class="card-setting">
          <div class="card-bottom-title">输出功率:</div>
          <n-input-number
            v-model:value="data.power"
            button-placement="both"
            style="width: 65%"
          >
            <template #suffix>W</template>
          </n-input-number>
        </div>
      </n-gi>
    </n-grid>

    <div class="card-mode">
      <div class="card-bottom-title" style="margin-bottom: 14px">模式</div>
      <div class="card-mode-content">
        <div class="card-mode-content-item">
          <div
            class="card-mode-content-icon"
            :class="data.mode[0] === 1 ? 'border-color-select' : ''"
            @click="onClick(0)"
          >
            <svg-icon
              v-if="data.mode[0] === 1"
              name="show_auto_g"
              :size="48"
            ></svg-icon>
            <svg-icon v-else name="show_auto" :size="36"></svg-icon>
          </div>
          <div class="card-mode-content-label">自动</div>
        </div>
        <div class="card-mode-content-item">
          <div
            class="card-mode-content-icon"
            :class="data.mode[1] === 1 ? 'border-color-select' : ''"
            @click="onClick(1)"
          >
            <svg-icon
              v-if="data.mode[1] === 1"
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
            :class="data.mode[2] === 1 ? 'border-color-select' : ''"
            @click="onClick(2)"
          >
            <svg-icon
              v-if="data.mode[2] === 1"
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
            :class="data.mode[3] === 1 ? 'border-color-select' : ''"
            @click="onClick(3)"
          >
            <svg-icon
              v-if="data.mode[3] === 1"
              name="show_fan2"
              :size="48"
            ></svg-icon>
            <svg-icon v-else name="show_fan2_g" :size="36"></svg-icon>
          </div>
          <div class="card-mode-content-label">通风</div>
        </div>
      </div>
    </div>

    <div class="card-bottom">
      <div class="card-bottom-title">风速</div>
      <div class="card-bottom-slider">
        <div class="card-bottom-text" style="margin-right: 4px">1</div>
        <n-slider
          v-model:value="data.fanSpeed"
          :min="1"
          :max="3"
          :step="1"
          :marks="marks"
        />
        <div class="card-bottom-text" style="margin-left: 4px">3</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { sendParams } from "../../../../utils/http";

const emit = defineEmits(["modMode", "setIndoorTemp"]);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const value = ref<any>(23.0);

let interval: number;

const marks = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
};

onMounted(() => {
  interval = window.setInterval(() => {
    getValue();
  }, 10000);
});

const getValue = () => {
  sendParams("aidevice001", {
    function: "get_curtemp",
    parms: {
    },
  })
    .then((res: any) => {
      if (res.status === "OK" && res.result.status === "ok") {
        value.value = parseFloat(res.result.value).toFixed(2);
        emit("setIndoorTemp", value.value)
        console.log("get_curtemp", res.result.value);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const onClick = (index: number) => {
  emit("modMode", index);
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
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-number {
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
      margin-left: 4px;
    }
  }

  &-mode {
    height: 150px;
    padding: 8px 2px 12px 2px;

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

  &-setting {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-bottom {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 20px;
      text-align: left;
      font-style: normal;
    }

    &-slider {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 80%;
    }

    &-text {
      font-weight: 400;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.53);
      line-height: 17px;
      text-align: left;
      font-style: normal;
    }
  }
}

.border-color-select {
  border: 1px solid #8c8cff;
}

::v-deep(.n-input__state-border) {
  border: 0 !important;
  box-shadow: none !important;
}

::v-deep(.n-input-wrapper) {
  background-color: #181621;
}

::v-deep(.n-input__input-el) {
  text-align: center;
  border-bottom: 1px solid rgba(102, 102, 255, 1);
}

::v-deep(.n-input__prefix) {
  height: 34px;
  margin-right: 0;
  border-bottom: 1px solid rgba(102, 102, 255, 1);
}

::v-deep(.n-input__suffix) {
  height: 34px;
  margin-left: 0;
  border-bottom: 1px solid rgba(102, 102, 255, 1);
}

::v-deep(.n-slider-handle) {
  display: none;
}

::v-deep(.n-slider-rail__fill) {
  background-color: transparent !important;
  background: linear-gradient(
    270deg,
    rgba(102, 102, 255, 0.53) 0%,
    rgba(102, 102, 255, 0) 100%
  );
  border-radius: 4px !important;
}

::v-deep(.n-slider-rail) {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

::v-deep(.n-slider-mark) {
  display: none;
}

::v-deep(.n-slider--with-mark) {
  margin: 0;
}

::v-deep(.n-slider-dots) {
  left: 2px !important;
}

::v-deep(.n-slider-dot) {
  display: none;
}

::v-deep(.n-slider-dot--active) {
  display: block;
  height: 4px !important;
  width: 4px !important;
  border: 0 !important;
  background-color: white !important;
}
</style>
