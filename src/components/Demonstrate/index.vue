<template>
  <div class="page" style="color: white">
    <div class="page-header">
      <div class="page-header-title" @click="onclick" style="cursor: pointer">
        <!-- <svg-icon name="lubanva" :size="250"></svg-icon> -->
        <FramesPlay :size="[200, 40]" />
      </div>
    </div>
    <div class="page-container">
      <n-grid x-gap="14" :cols="12" style="margin-bottom: 14px">
        <n-gi :span="4" class="page-container-card filter-height">
          <EnvirSetup :data="data.environment" />
        </n-gi>
        <n-gi :span="5" class="page-container-card filter-height">
          <AirPanel :data="data.conditioner" />
        </n-gi>
        <n-gi :span="3" class="page-container-card filter-height">
          <ALPredicts :data="data.predicts" />
        </n-gi>
      </n-grid>

      <n-grid x-gap="14" :cols="2">
        <n-gi class="page-container-card chart-height">
          <TempList :data="history_data"/>
        </n-gi>

        <n-gi class="page-container-card chart-height">
          <EnergyComparison :data="history_data"/>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, reactive, ref } from "vue";
import { EnvirSetup } from "./components/EnvirSetup";
import { cloneDeep } from "lodash-es";
import { AirPanel } from "./components/AirPanel";
import { ALPredicts } from "./components/ALPredicts";
import { TempList } from "./components/TempList";
import { EnergyComparison } from "./components/EnergyComparison";
import { FramesPlay } from "../FramesPlay";
import {
  getDevices,
  createDevice,
  createMetric,
  getMetric,
  sendParams,
  getAllValue,
} from "../../utils/http";
import {
  deviceData,
  metricTemperature,
  metricHumidity,
  metricHistoryData,
  metricPredictTemp,
  metricKd,
  metricHighTemp,
  metricLowTemp,
  metricPerson,
  metricWeather,
  metricKp,
  metricKi,
  ApiResponse,
  sendParam,
  MY_DEMONSTRATE_KEY,
  createMetrics,
  calculateTimeRange,
} from "./untils/until";
import { message } from "ant-design-vue";

const data = reactive<any>({
  environment: {
    person: 1,
    humidity: 25.5,
    low_temp: 20,
    high_temp: 25.5,
    weather: 4,
  },
  conditioner: {
    indoor_temp: 23,
    set_temp: 25.5,
    timer_switch: [1183189260000, Date.now()],
    wind_speed: 1,
    mode: 1,
  },
  predicts: {
    P: 0.1,
    I: 0.1,
    D: 0.01,
  },
});

const device_id = ref("");

const metricKeys: Record<string, string> = {
  temperature: "",
  humidity: "",
  weather: "",
  person: "",
  low_temp: "",
  high_temp: "",
  predict_temp: "",
  history_data: "",
  kp: "",
  ki: "",
  kd: "",
};

const history_data = ref<any>([])

let interval: number;

onMounted(() => {
  //init data
  initData();
});

// 创建设备和所有相关指标
const createDeviceWithMetrics = async (): Promise<void> => {
  try {
    const res: ApiResponse<any> = await createDevice(deviceData);

    if (res.status === "OK") {
      device_id.value = res.data.id;

      // 并行创建所有指标
      const metrics = [
        metricTemperature(res.data.id),
        metricHumidity(res.data.id),
        metricWeather(res.data.id),
        metricPerson(res.data.id),
        metricLowTemp(res.data.id),
        metricHighTemp(res.data.id),
        metricKp(res.data.id),
        metricKi(res.data.id),
        metricKd(res.data.id),
        metricPredictTemp(res.data.id),
        metricHistoryData(res.data.id),
      ];

      await Promise.all(metrics.map(createMetrics));
    }
  } catch (error) {
    console.error("Create device error:", error);
  }
};

// 获取指标数据
const getPointsData = async (): Promise<void> => {
  try {
    const res = await getMetric();
    if (res.status === "OK") {
      console.log("Metrics data retrieved successfully", res.data);

      res.data.forEach((item: { uid: string; id: string }) => {
        if (item.uid in metricKeys) {
          metricKeys[item.uid] = item.id;
        }
      });

      console.log("Metric Keys:", metricKeys);
    } else {
      console.warn("Get metrics returned non-OK status:", res.data);
    }
  } catch (error) {
    console.error("Get metrics error:", error);
    // 可以根据需要决定是否抛出错误
  }
};

// 初始化数据
const initData = async (): Promise<void> => {
  try {
    const res: ApiResponse<any[]> = await getDevices();

    if (res.status === "OK") {
      if (res.data.length === 0) {
        await createDeviceWithMetrics();
        await getPointsData();
      } else {
        device_id.value = res.data[0].id;
        await getPointsData();
      }
    }
  } catch (error) {
    console.error("Get devices error:", error);
  }
};

const onclick = () => {
  window.location.reload();
};

//AI Page
const submit = async (): Promise<void> => {
  // try {
  //   const res = await sendParams(device_id.value, {
  //     function: "stop",
  //     parms: {},
  //   });

  //   if (res.status === "OK" && res.data?.status === "ok") {
  //     await writeParams(data.conditioner, data.predicts);
  //   } else {
  //     message.warn("Stop command failed");
  //   }
  // } catch (e) {
  //   console.error("Stop command error:", e);
  //   // 考虑添加用户通知或重试逻辑
  //   message.warn("Stop command error");
  // }
  writeParams(data.conditioner, data.predicts)
};

const writeParams = async (data: any, pid: any): Promise<void> => {
  console.log("writeParams", data);
  //time
  const { startTime, endTime } = calculateTimeRange(data.timer_switch);

  try {
    // 并行发送所有参数设置请求
    await Promise.all([
      sendParam(
        {
          temperature: data.set_temp,
          start_time: startTime,
          end_time: endTime,
          mode: data.mode,
          speed: data.wind_speed,
          kp: pid.P,
          ki: pid.I,
          kd: pid.D,
        },
        device_id.value
      ),
      // sendParam({ start_time: startTime, end_time: endTime }, device_id.value),
      // sendParam({ mode: data.mode }, device_id.value),
      // sendParam({ speed: data.wind_speed }, device_id.value),
      // sendParam({ kp: pid.P, ki: pid.I, kd: pid.D }, device_id.value),
    ]);

    // 所有参数设置成功后发送start命令
    const startRes = await sendParams(device_id.value, {
      function: "start",
      parms: {},
    });

    if (startRes.status !== "OK" || startRes.data?.status !== "ok") {
      message.warn("Start command failed");
    }

    //周期性读取数据
    interval = window.setInterval(() => {
      readData();
    }, 5000);
  } catch (e) {
    console.error("Write params error:", e);
    throw e; // 重新抛出错误以便上层处理
  }
};

const readData = async () => {
  try {
    const res = await getAllValue(device_id.value);

    if (res.status !== "OK") {
      console.warn("Read params returned non-OK status:", res.data);
      return;
    }

    // 创建映射以提高查找效率
    const dataMap = new Map(
      res.data.map((item: any) => [item.metric_id, item.value])
    );

    const processNumericValue = (value: any): number | null => {
      if (value === null || value === undefined) return null;
      const num = parseFloat(value);
      return isNaN(num) ? null : parseFloat(num.toFixed(1));
    };

    const processNumberValue = (value: any): number | null => {
      return Number(value);
    };

    const processStringValue = (value: any): string | null => {
      return String(value);
    };

    const updates = {
      environment: {
        person: { key: metricKeys.person, processor: processNumberValue },
        humidity: { key: metricKeys.humidity, processor: processNumberValue },
        low_temp: { key: metricKeys.low_temp, processor: processNumberValue },
        high_temp: { key: metricKeys.high_temp, processor: processNumberValue },
        weather: { key: metricKeys.weather, processor: processNumberValue },
      },
      conditioner: {
        indoor_temp: {
          key: metricKeys.temperature,
          processor: processNumberValue,
        },
      },
      predicts: {
        P: { key: metricKeys.kp, processor: processNumberValue },
        I: { key: metricKeys.ki, processor: processNumberValue },
        D: { key: metricKeys.kd, processor: processNumberValue },
      },
    };

    // 使用循环更新数据，减少重复代码
    Object.entries(updates.environment).forEach(
      ([key, { key: metricKey, processor }]) => {
        const rawValue = dataMap.get(metricKey);
        data.environment[key] = processor(rawValue);
      }
    );

    const indoorTempValue = dataMap.get(updates.conditioner.indoor_temp.key);
    data.conditioner.indoor_temp =
      updates.conditioner.indoor_temp.processor(indoorTempValue);

    Object.entries(updates.predicts).forEach(
      ([key, { key: metricKey, processor }]) => {
        const rawValue = dataMap.get(metricKey);
        data.predicts[key] = processor(rawValue);
      }
    );

    const history = dataMap.get(metricKeys.history_data)

    if (typeof history === 'string') {
      history_data.value = JSON.parse(history)
    }

    console.log("Read params success:", data); 

  } catch (e) {
    console.error("Read params error:", e);
  }
};

const reset = async () => {
  console.log("reset");
  clearInterval(interval);

  try {
    const res = await sendParams(device_id.value, {
      function: "stop",
      parms: {},
    });

    if (res.status === "OK" && res.data?.status === "ok") {
    } else {
      message.warn("Stop command failed");
    }
  } catch (e) {
    console.error("Stop command error:", e);
    // 考虑添加用户通知或重试逻辑
    message.warn("Stop command error");
  }
};

provide(MY_DEMONSTRATE_KEY, {
  submit,
  reset,
});
</script>

<style lang="less" scoped>
@card-first-height: 380px;
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
      background: #181621;
      border-radius: 12px;
      backdrop-filter: blur(16px);
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
