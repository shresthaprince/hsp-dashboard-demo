import { useSensorData } from "../../context/SensorDataContext";
import AppText from "../common/AppText";
import { SmallDashboardBlock } from "../common/DashboardBlock";

const TemperatureBlock = () => {
  const { latestEnvData } = useSensorData();
  return (
    <SmallDashboardBlock title="Temperature">
      <AppText themeColor="white" fontSize={2}>
        {latestEnvData.dataAvailable && latestEnvData.sensorData
          ? latestEnvData.sensorData.temperature.toFixed(1) + "\u00B0C"
          : "No data"}
      </AppText>
    </SmallDashboardBlock>
  );
};

export default TemperatureBlock;
