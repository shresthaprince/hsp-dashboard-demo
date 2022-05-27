export type LatestSensorData = {
  payload: {
    timeElapsed: number;
    temperature: number;
    humidity: number;
    ecgValue: number;
  };
  device_id: string;
  timestamp: number;
};

export type EcgData = {
  ecg: number;
  timeElapsed: number;
  timestamp: number;
};
