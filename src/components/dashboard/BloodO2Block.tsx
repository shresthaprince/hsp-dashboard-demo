import AppText from "../common/AppText";
import { SmallDashboardBlock } from "../common/DashboardBlock";

const BloodO2Block = () => {
  return (
    <SmallDashboardBlock title="Blood O2 Level">
      <div className="d-flex flex-column align-items-center">
        <AppText themeColor="red" fontSize={2} style={{ lineHeight: "16px" }}>
          //
        </AppText>
        <AppText themeColor="red" fontSize={5}>
          //
        </AppText>
      </div>
    </SmallDashboardBlock>
  );
};

export default BloodO2Block;
