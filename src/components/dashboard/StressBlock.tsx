import AppText from "../common/AppText";
import { SmallDashboardBlock } from "../common/DashboardBlock";

const StressBlock = () => {
  return (
    <SmallDashboardBlock title="Stress Level">
      <AppText themeColor="white" fontSize={2}>
        MODERATE
      </AppText>
    </SmallDashboardBlock>
  );
};

export default StressBlock;
