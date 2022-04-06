import AppText from "../common/AppText";
import { SmallDashboardBlock } from "../common/DashboardBlock";

const HRVBlock = () => {
  return (
    <SmallDashboardBlock title="HRV">
      <AppText themeColor="white" fontSize={2}>
        35%
      </AppText>
    </SmallDashboardBlock>
  );
};

export default HRVBlock;
