import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getHspLatestSensorData,
  getHspSensorData,
} from "../services/getHspSensorData";
import { EcgData, LatestSensorData } from "../types/api";

enum DataFetchMode {
  LIVE,
  LATEST,
  CUSTOM,
}
type DataFetchModeOptions = keyof typeof DataFetchMode;

type EnvDataType = {
  humidity: number;
  temperature: number;
  time: number;
};

type LatestEnvDataType = {
  sensorData: EnvDataType | null;
  dataAvailable: boolean;
};

interface SensorDataProviderContextInterface {
  latestEnvData: LatestEnvDataType;
  latestEcgData: Array<EcgData> | null;
  updateDataFetchMode: (fetchMode: keyof typeof DataFetchMode) => void;
  dataFetchMode: DataFetchModeOptions;
  updateDataFetchModeToCustom: (customDate: number) => void;
}

const SensorDataProviderContext =
  createContext<SensorDataProviderContextInterface>({
    latestEnvData: {
      sensorData: null,
      dataAvailable: false,
    },
    latestEcgData: null,
    updateDataFetchMode: () => null,
    dataFetchMode: "LATEST",
    updateDataFetchModeToCustom: (_customDate: number) => null,
  });

export const useSensorData = () => {
  const sensorDataProviderContext = useContext(SensorDataProviderContext);
  if (!sensorDataProviderContext) {
    throw new Error(`Error`);
  }
  return sensorDataProviderContext;
};

interface SensorDataProviderProps {
  children: ReactNode;
}

let interval: NodeJS.Timer | null = null;

export const SensorDataProvider = ({ children }: SensorDataProviderProps) => {
  const [dataFetchMode, setDataFetchMode] =
    useState<DataFetchModeOptions>("LATEST");
  const [customDate, setCustomDate] = useState<number | null>(null);

  const liveDataFetch = useCallback(() => {
    interval = setInterval(refetchData, 1000);
  }, []);

  const updateDataFetchMode = (fetchMode: DataFetchModeOptions) =>
    setDataFetchMode(fetchMode);

  const updateDataFetchModeToCustom = (customDate: number) => {
    setCustomDate(customDate);
    setDataFetchMode("CUSTOM");
  };

  const [latestSensorData, setLatestSensorData] =
    useState<LatestSensorData | null>(null);
  const [latestEcgData, setLatestEcgData] = useState<Array<EcgData> | null>(
    null
  );

  const refetchData = async () => {
    const [ecgData, latestData] = await Promise.all([
      getHspSensorData(),
      getHspLatestSensorData(),
    ]);
    setLatestEcgData(ecgData?.data || null);

    setLatestSensorData(latestData?.data ? latestData?.data : null);
  };

  const refetchDataCustom = useCallback(async () => {
    if (customDate) {
      const [ecgData, latestData] = await Promise.all([
        getHspSensorData(customDate),
        getHspLatestSensorData(customDate),
      ]);
      setLatestEcgData(ecgData?.data || null);

      setLatestSensorData(latestData?.data ? latestData?.data : null);
    }
  }, [customDate]);

  useEffect(() => {
    if (interval) clearInterval(interval);
    switch (dataFetchMode) {
      case "LIVE":
        liveDataFetch();
        break;
      case "CUSTOM":
        refetchDataCustom();
        break;
      case "LATEST":
      default:
        refetchData();
        break;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dataFetchMode, refetchDataCustom]);

  const latestEnvData = useMemo(() => {
    if (latestSensorData) {
      return {
        sensorData: {
          humidity: latestSensorData["payload"].humidity,
          temperature: latestSensorData["payload"].temperature,
          time: latestSensorData["timestamp"],
        },
        dataAvailable: true,
      };
    }
    return { sensorData: null, dataAvailable: false };
  }, [latestSensorData]);

  const wrapped = {
    latestEnvData,
    latestEcgData,
    updateDataFetchMode,
    dataFetchMode,
    updateDataFetchModeToCustom,
  };
  return (
    <SensorDataProviderContext.Provider value={wrapped}>
      {children}
    </SensorDataProviderContext.Provider>
  );
};
