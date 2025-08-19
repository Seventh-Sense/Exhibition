import type { ECharts, ComposeOption } from "echarts/core";
import type { BarSeriesOption, LineSeriesOption } from "echarts/charts";
import type {
  TitleComponentOption,
  GridComponentOption,
} from "echarts/components";
import { InjectionKey } from "vue";
import { number } from "echarts";

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
>;

export interface Presentation {
  tradition: Tradition;
  ai: AI;
}

export interface Tradition {
  setTemp: number;
  mode: Array<number>;
  fanSpeed: number;
  power: number;
}

export interface AI {
  people: number;
  humidity: number;
  area: number;
  ominTemp: number;
  omaxTemp: number;
  weather: Array<number>;
  preference: Array<number>;
}

export interface Other {
  ominTemp: number;
  omaxTemp: number;
  irealTemp: number;
}

export interface DataItem {
  name: string;
  value: [string, number];
}

export interface Methods {
  submit: () => void;
  reset: () => void;
}

export const MY_FUNCTIONS_KEY = Symbol() as InjectionKey<Methods>;

export const PresentationData = {
  tradition: {
    setTemp: 23,
    mode: [0, 1, 0, 0],
    fanSpeed: 3,
    power: 2500,
  },
  ai: {
    people: 1,
    humidity: 25,
    area: 25,
    ominTemp: 10,
    omaxTemp: 22,
    weather: [1, 0, 0, 0],
    preference: [0, 1, 0],
  },
};

const handlePrefer = (arr: Array<number>) => {
  if (arr.length === 3) {
    const [first, second, third] = arr;

    if (first === 1) return -1;
    if (second === 1) return 0;
    if (third === 1) return 1;
  }

  return 1;
};

const handleMode = (arr: Array<number>) => {
  if (arr.length === 4) {
    const [first, second, third, fourth] = arr;

    if (first === 1) return 0;
    if (second === 1) return 1;
    if (third === 1) return 2;
    if (fourth === 1) return 3;
  }

  return 1;
};

//数据封装
export const dataEncap = (data: Presentation) => {
  return (
    data.ai.ominTemp +
    "," +
    data.ai.omaxTemp +
    "," +
    data.ai.area +
    "," +
    data.tradition.setTemp +
    "," +
    data.ai.people +
    "," +
    handlePrefer(data.ai.preference) +
    "," +
    data.tradition.power / 1000 +
    "," +
    handleMode(data.tradition.mode) +
    "," +
    data.tradition.fanSpeed
  );

  //return "start,10,18,23,25,2,0,1.5,2";
};

export const inputDataEncap = (start_time: any) => {
  let end_time = new Date().getTime();

  return [
    {
      device_id: "aidevice001",
      metric_id: "temperature",
      start_time: start_time,
      end_time: end_time,
    },
    {
      device_id: "aidevice001",
      metric_id: "energy",
      start_time: start_time,
      end_time: end_time,
    },
  ];
};

export const ParseData = (data: Array<any>, tmpe_id: any, ener_id: any) => {
  let result: any = {
    regular_temp: [],
    ai_temp: [],
    regular_energy: [],
    ai_energy: [],
  };

  const metrics = ["temperature", "energy"] as const;

  data.forEach((item: any) => {
    if (item.metric_id === tmpe_id) {
      let timestamp = item.timestamp;
      let regular_temp = item.value.split(",")[0];
      let ai_temp = item.value.split(",")[1];
      result.regular_temp.push([timestamp, parseFloat(regular_temp)]);
      result.ai_temp.push([timestamp, parseFloat(ai_temp)]);
    }

    if (item.metric_id === ener_id) {
      let timestamp = item.timestamp;
      let regular_energy = item.value.split(",")[0];
      let ai_energy = item.value.split(",")[1];
      result.regular_energy.push([timestamp, parseFloat(regular_energy)]);
      result.ai_energy.push([timestamp, parseFloat(ai_energy)]);
    }
  });

  return result;
};

const translateArray = (arr: Array<any>) => {
  let array: any = [];

  arr.forEach((item: any) => {
    array.push([item.timestamp, item.value]);
  });

  return array;
};

export const x = [
  0.0, 0.02, 0.03, 0.05, 0.07, 0.08, 0.1, 0.12, 0.13, 0.15, 0.17, 0.18, 0.2,
  0.22, 0.23, 0.25, 0.27, 0.28, 0.3, 0.32, 0.33, 0.35, 0.37, 0.38, 0.4, 0.42,
  0.43, 0.45, 0.47, 0.48, 0.5, 0.52, 0.53, 0.55, 0.57, 0.58, 0.6, 0.62, 0.63,
  0.65, 0.67, 0.68, 0.7, 0.72, 0.73, 0.75, 0.77, 0.78, 0.8, 0.82, 0.83, 0.85,
  0.87, 0.88, 0.9, 0.92, 0.93, 0.95, 0.97, 0.98,
];

export const y1 = [
  22.74, 23.12, 23.22, 23.3, 23.29, 23.24, 23.17, 23.1, 23.04, 23.0, 22.97,
  22.96, 22.97, 22.98, 22.98, 22.99, 22.99, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0,
  23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0,
  23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0,
  23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0,
];

export const y2 = [
  22.08, 22.35, 22.59, 22.62, 22.6, 22.54, 22.46, 22.39, 22.34, 22.31, 22.3,
  22.3, 22.3, 22.3, 22.31, 22.32, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33,
  22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33,
  22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33,
  22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33, 22.33,
  22.33, 22.33, 22.33, 22.33, 22.33,
];

export const mergeArrays = (arr1: any, arr2: any) => {
  if (arr1.length !== arr2.length) throw new Error("数组长度不一致");
  return arr1.map((element: any, index: any) => {
    return [element, arr2[index]];
  });
};

export const newA = mergeArrays(x, y1);
export const newB = mergeArrays(x, y2);

export const deviceData = {
  uid: "aicontroller",
  name: "aicontroller",
  address: "127.0.0.1",
  protocol: "udp",
  enabled: true,
  status: "",
  property: { host: "127.0.0.1", port: 12345 },
  tags: "",
  description: "",
};

export const metricOne = (id: any) => {
  return {
    uid: "temperature",
    name: "temperature",
    property: { function: "get_temp" },
    tags: "",
    description: "",
    device_id: id,
  };
};

export const metricTwo = (id: any) => {
  return {
    uid: "energy",
    name: "energy",
    property: { function: "get_energy" },
    tags: "",
    description: "",
    device_id: id,
  };
};
