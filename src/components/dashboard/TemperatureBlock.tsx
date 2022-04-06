import AppText from "../common/AppText";
import { SmallDashboardBlock } from "../common/DashboardBlock";

const TemperatureBlock = () => {
  return (
    <SmallDashboardBlock title="Temperature">
      <AppText themeColor="white" fontSize={2}>
        37&#176;C
      </AppText>
    </SmallDashboardBlock>
  );
};

export default TemperatureBlock;
