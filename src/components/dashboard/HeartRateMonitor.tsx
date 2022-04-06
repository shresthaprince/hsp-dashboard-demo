import { BigDashboardBlock } from "../common/DashboardBlock";
import EcgGraph from "../EcgGraph";

const HeartRateMonitor = () => {
  return (
    <BigDashboardBlock title="Heart Rate Monitor">
      <EcgGraph />
    </BigDashboardBlock>
  );
};

export default HeartRateMonitor;
