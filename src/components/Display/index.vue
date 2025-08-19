<template>
  <div class="page" style="color: white">
    <div class="page-header">
      <div class="page-header-title" @click="onclick" style="cursor: pointer">
        <svg-icon name="lubanxlyzkdy" :size="400"></svg-icon>
      </div>
    </div>
    <div class="page-container">
      <n-grid x-gap="14" :cols="12" style="margin-bottom: 14px">
        <n-gi :span="4" class="page-container-card filter-height">
          <TraditionSet
            :device_id="device_id"
            :data="PresentData.tradition"
            @modMode="modMode"
            @setIndoorTemp="setIndoorTemp"
          />
        </n-gi>
        <n-gi :span="5" class="page-container-card filter-height">
          <AISet
            :data="PresentData.ai"
            @modPrefer="modPrefer"
            @modWeather="modWeather"
          />
        </n-gi>
        <n-gi :span="3" class="page-container-card filter-height">
          <OtherSet
            :device_id="device_id"
            :tradition="PresentData.tradition"
            :indoorTemp="indoorTemp"
          />
        </n-gi>
      </n-grid>

      <n-grid x-gap="14" :cols="2">
        <n-gi class="page-container-card chart-height">
          <TemperatureChart :data="TempData" />
          <!-- <G2Chart :data="EnergyData" /> -->
        </n-gi>
        <n-gi class="page-container-card chart-height">
          <EnergyChart :data="EnergyData" />
          <!-- <UplotChart :data="EnergyData"/> -->
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, reactive, ref } from "vue";
import { TemperatureChart } from "./components/TemperatureChart";
import { EnergyChart } from "./components/EnergyChart";
import {
  MY_FUNCTIONS_KEY,
  ParseData,
  Presentation,
  PresentationData,
  inputDataEncap,
  dataEncap,
  deviceData,
  metricOne,
  metricTwo,
} from "./until/until";
import { TraditionSet } from "./components/TraditionSet";
import { AISet } from "./components/AISet";
import { OtherSet } from "./components/OtherSet";
import { cloneDeep } from "lodash-es";
import { message } from "ant-design-vue";
import {
  readChartData,
  sendParams,
  createDevice,
  createMetric,
  getDevices,
  getMetric,
  delMetric,
} from "../../utils/http";

const PresentData = reactive<Presentation>(cloneDeep(PresentationData));

const startTime = ref(0);

let interval: number;

const indoorTemp = ref("0");

const setIndoorTemp = (data: any) => {
  indoorTemp.value = data;
  console.log(typeof indoorTemp.value);
};
const TempData = ref({
  regular_temp: [],
  ai_temp: [],
});
const EnergyData = ref({
  regular_energy: [],
  ai_energy: [],
});

const modMode = (index: number) => {
  let tmp = PresentData.tradition.mode;
  tmp[index] = tmp[index] === 1 ? 0 : 1;

  if (tmp[index] === 1) {
    PresentData.tradition.mode = [0, 0, 0, 0];
    PresentData.tradition.mode[index] = 1;
  } else {
    PresentData.tradition.mode = tmp;
  }
};

const modWeather = (index: number) => {
  let tmp = PresentData.ai.weather;

  tmp[index] = tmp[index] === 1 ? 0 : 1;

  if (tmp[index] === 1) {
    PresentData.ai.weather = [0, 0, 0, 0];
    PresentData.ai.weather[index] = 1;
  } else {
    PresentData.ai.weather = tmp;
  }
};

const modPrefer = (index: number) => {
  let tmp = PresentData.ai.preference;

  tmp[index] = tmp[index] === 1 ? 0 : 1;

  if (tmp[index] === 1) {
    PresentData.ai.preference = [0, 0, 0];
    PresentData.ai.preference[index] = 1;
  } else {
    PresentData.ai.preference = tmp;
  }
};

const device_id = ref("");
const tmpe_id = ref("");
const ener_id = ref("");

onMounted(() => {
  getDevices()
    .then((res) => {
      if (res.status === "OK") {
        if (res.data.length === 0) {
          createDevices();
        } else if (res.data.length === 1) {
          device_id.value = res.data[0].id;
        }
      }
    })
    .catch((e: any) => {
      console.error("get device error:", e);
    })
    .finally(() => {
      getMetrics();
    });
});

const createDevices = () => {
  createDevice(deviceData)
    .then((res: any) => {
      console.log("create device success", res);
      if (res.status === "OK") {
        device_id.value = res.data.id;
        creatMetrics(metricOne(res.data.id));
        creatMetrics(metricTwo(res.data.id));
      }
    })
    .catch((e: any) => {
      console.error("create device error:", e);
    });
};

const creatMetrics = (data: any) => {
  createMetric(data)
    .then((res) => {
      console.log(res);
    })
    .catch((e: any) => {
      console.error("create device error:", e);
    });
};

const getMetrics = () => {
  getMetric()
    .then((res) => {
      if (res.status === "OK") {
        if (res.data.length === 2) {
          res.data.forEach((item: any) => {
            if (item.uid === "temperature") {
              tmpe_id.value = item.id;
            }

            if (item.uid === "energy") {
              ener_id.value = item.id;
            }
          });
        }
      }
    })
    .catch((e: any) => {
      console.error("create device error:", e);
    });
};

const deleteData = (id: string) => {
  delMetric(id)
    .then((res) => {
      console.log(res);
    })
    .catch((e: any) => {
      console.error("delMetric error:", e);
    });
};

const onclick = () => {
  window.location.reload();
};
const submit = () => {
  console.log(PresentData);

  deleteData(tmpe_id.value)
  deleteData(ener_id.value)

  window.clearInterval(interval);
  startTime.value = new Date().getTime();

  sendParams(device_id.value, {
    function: "stop",
    parms: {},
  })
    .then((res: any) => {
      console.log(res);
      if (res.status === "OK" && res.data.status === "OK") {
        sendInitInfo();
      }
    })
    .catch((e: any) => {
      console.error("Init error:", e);
    });
};

const sendInitInfo = () => {
  sendParams(device_id.value, {
    function: "start",
    parms: {
      args: dataEncap(PresentData),
    },
  })
    .then((res: any) => {
      if (res.status === "OK") {
        //message.success("开始模拟！");
        //console.log('send Params success')
        readData();
        interval = window.setInterval(() => {
          readData();
        }, 5000);
      } else {
        message.error("模拟失败！");
      }
    })
    .catch((e: any) => {
      console.error("send Params error:", e);
      message.success("模拟失败！");
    });
};

const readData = () => {
  readChartData()
    .then((res: any) => {
      //console.log(res)
      if (res.status === "OK") {
        let result = ParseData(res.data, tmpe_id.value, ener_id.value);

        console.log(result);
        TempData.value = {
          regular_temp: result.regular_temp,
          ai_temp: result.ai_temp,
        };

        EnergyData.value = {
          regular_energy: result.regular_energy,
          ai_energy: result.ai_energy,
        };
      }
    })
    .catch((e: any) => {
      console.error("send Params error:", e);
    });
};

const reset = () => {
  console.log(PresentationData);
  PresentData.tradition = cloneDeep(PresentationData.tradition);
  PresentData.ai = cloneDeep(PresentationData.ai);

  window.clearInterval(interval);
  //clear
  TempData.value = {
    regular_temp: [],
    ai_temp: [],
  };

  EnergyData.value = {
    regular_energy: [],
    ai_energy: [],
  };

  sendParams(device_id.value, {
    function: "stop",
    parms: {},
  })
    .then((res: any) => {
      if (res.status === "OK") {
        //message.success("模拟已停止！");
      }
    })
    .catch((e: any) => {
      console.error("Init error:", e);
    });
};

provide(MY_FUNCTIONS_KEY, {
  submit,
  reset,
});
</script>

<style lang="less" scoped>
@card-first-height: 314px;
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
