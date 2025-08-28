<template>
  <div class="card">
    <div>
      <div class="card-title">AI调节参数</div>
      <div class="card-item">
        <div class="card-item-title">P</div>
        <n-input-number
          class="ainput"
          v-model:value="data.P"
          button-placement="both"
          style="width: 50%"
          min="0"
          step="0.1"
        />
      </div>
      <div class="card-item">
        <div class="card-item-title">I</div>
        <n-input-number
          class="ainput"
          v-model:value="data.I"
          button-placement="both"
          style="width: 50%"
          min="0"
          step="0.1"
        />
      </div>
      <div class="card-item">
        <div class="card-item-title">D</div>
        <n-input-number
          class="ainput"
          v-model:value="data.D"
          button-placement="both"
          style="width: 50%"
          min="0"
          step="0.05"
        />
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
import { ref, inject } from "vue";
import { MY_DEMONSTRATE_KEY } from "../../untils/until";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const myFunctions = inject(MY_DEMONSTRATE_KEY);

const isShow = ref(true);

const onClick = () => {
  if (isShow.value) {
    myFunctions?.submit();
    isShow.value = false;
  } else {
    myFunctions?.reset();
    isShow.value = true;
  }
};

const onReset = () => {
  myFunctions?.reset();
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding: 6px 12px 0 12px;
  background-image: url("@/assets/show_background.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

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

.ainput::v-deep(.n-input) {
  background: transparent !important;
}

.ainput::v-deep(.n-input__state-border) {
  border: 0 !important;
  box-shadow: none !important;
}

.ainput::v-deep(.n-input-wrapper) {
  background-color: transparent !important;
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
