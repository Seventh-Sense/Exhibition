import { InjectionKey } from "vue";
import { sendParams, createMetric } from "../../../utils/http";

export interface Presentation {
  environment: Environment;
  conditioner: Conditioner;
  predicts: Predicts;
}

export interface Environment {
  person: number;
  humidity: number;
  low_temp: number;
  high_temp: number;
  weather: number;
}

export interface Conditioner {
  indoor_temp: number;
  set_temp: number;
  timer_switch: any;
  wind_speed: number;
  mode: number;
}

export interface Predicts {
  P: number;
  I: number;
  D: number;
}

export const PresentationData = {
  environment: {
    people: 23,
    humidity: 1,
    ominTemp: 3,
    omaxTemp: 2500,
    weather: 2500,
  },
  conditioner: {
    setTemp: 1,
    times: 25,
    speed: 25,
    mode: 10,
  },
};

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface Metric {
  uid: string;
  name: string;
  property: { function: string };
  tags: string;
  description: string;
  device_id: string;
}
// 设备数据
export const deviceData = {
  uid: "aicontroller",
  name: "aicontroller",
  address: "192.168.20.66",
  protocol: "udp",
  enabled: true,
  status: "",
  property: { host: "192.168.20.66", port: 12345 },
  tags: "",
  description: "",
};

// 统一的指标创建函数
const createMetricConfig = (id: string, uid: string, func: string): Metric => ({
  uid,
  name: uid,
  property: { function: func },
  tags: "",
  description: "",
  device_id: id,
});

// 特定指标的函数
export const metricTemperature = (id: string) =>
  createMetricConfig(id, "temperature", "get_temperature");
export const metricHumidity = (id: string) =>
  createMetricConfig(id, "humidity", "get_humidity");
export const metricWeather = (id: string) =>
  createMetricConfig(id, "weather", "get_weather");
export const metricPerson = (id: string) =>
  createMetricConfig(id, "person", "get_person");
export const metricLowTemp = (id: string) =>
  createMetricConfig(id, "low_temp", "get_low_temp");
export const metricHighTemp = (id: string) =>
  createMetricConfig(id, "high_temp", "get_high_temp");
export const metricKp = (id: string) => createMetricConfig(id, "kp", "get_kp");
export const metricKi = (id: string) => createMetricConfig(id, "ki", "get_ki");
export const metricKd = (id: string) => createMetricConfig(id, "kd", "get_kd");
export const metricPredictTemp = (id: string) =>
  createMetricConfig(id, "predict_temp", "get_predict_temp");
export const metricHistoryData = (id: string) =>
  createMetricConfig(id, "history_data", "get_history_data");


export interface Methods {
  submit: () => void;
  reset: () => void;
}

export const MY_DEMONSTRATE_KEY = Symbol() as InjectionKey<Methods>;


export const calculateTimeRange = (
  timerSwitch: [string, string]
): { startTime: number; endTime: number } => {
  let startTime = 0;
  let endTime = 0;

  if (timerSwitch[0] && timerSwitch[1]) {
    const startDate = new Date(timerSwitch[0]);
    const endDate = new Date(timerSwitch[1]);

    startTime = startDate.getHours() * 60 + startDate.getMinutes();
    endTime = endDate.getHours() * 60 + endDate.getMinutes();
  }

  return { startTime, endTime };
};


// 创建指标的辅助函数
export const createMetrics = async (data: Metric): Promise<void> => {
  try {
    const res = await createMetric(data);
    console.log("Metric created successfully", res);
  } catch (error) {
    console.error("Create metric error:", error);
  }
};

export const sendParam = async (data: Record<string, any>, id: any): Promise<void> => {
  try {
    const res = await sendParams(id, {
      function: "set_parameter",
      parms: data,
    });
    console.log("Parameter set response:", res);
  } catch (e) {
    console.error("Set parameter error:", e);
    throw e; // 重新抛出错误以便上层处理
  }
};