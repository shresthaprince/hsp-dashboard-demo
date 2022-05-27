import { useSensorData } from "../../context/SensorDataContext";
import AppText from "../common/AppText";
import { SmallDashboardBlock } from "../common/DashboardBlock";

const StressBlock = () => {
  const { latestEnvData } = useSensorData();
  return (
    <SmallDashboardBlock title="Humidity">
      <AppText themeColor="white" fontSize={2}>
        {latestEnvData.dataAvailable && latestEnvData.sensorData
          ? latestEnvData.sensorData.humidity + "%"
          : "No data"}
      </AppText>
    </SmallDashboardBlock>
  );
};

export default StressBlock;
