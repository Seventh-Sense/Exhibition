

interface DataItem {
  type: string;
  value: number;
  status?: number;
}

enum AirQualityStatus {
  Invalid = 0,
  Good = 1,
  Moderate = 2,
  Severe = 3,
}

type PollutionTypeConfig = {
  validRange: { min: number; max: number };
  thresholds: {
    goodMax: number;
    moderateMax: number;
  };
};

const POLLUTION_CONFIGS: Record<string, PollutionTypeConfig> = {
  "PM2.5": {
    validRange: { min: 0, max: 500 },
    thresholds: { goodMax: 75, moderateMax: 150 },
  },
  CO2: {
    validRange: { min: 0, max: 5000 },
    thresholds: { goodMax: 800, moderateMax: 1200 },
  },
  PM10: {
    validRange: { min: 0, max: 600 },
    thresholds: { goodMax: 100, moderateMax: 200 },
  },
  HCHO: {
    validRange: { min: 0, max: 1 },
    thresholds: { goodMax: 0.1, moderateMax: 0.5 },
  },
} as const;

const getAirQualityStatus = (
  value: number,
  config: PollutionTypeConfig
): AirQualityStatus => {
  const { min, max } = config.validRange;
  const { goodMax, moderateMax } = config.thresholds;

  if (value < min || value > max) return AirQualityStatus.Invalid;
  if (value > moderateMax) return AirQualityStatus.Severe;
  if (value > goodMax) return AirQualityStatus.Moderate;
  return AirQualityStatus.Good;
};

const handleDataItem = (item: DataItem): DataItem => {
  const config = POLLUTION_CONFIGS[item.type];
  if (!config) return item;

  return {
    ...item,
    status: getAirQualityStatus(item.value, config),
  };
};

export const handleData = (data: DataItem[]): DataItem[] => {
  return data.map(handleDataItem);
};
