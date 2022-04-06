import BloodO2Block from "../components/dashboard/BloodO2Block";
import GPSLocation from "../components/dashboard/GPSLocation";
import HeartRateMonitor from "../components/dashboard/HeartRateMonitor";
import HRVBlock from "../components/dashboard/HRVBlock";
import NotificationsBlock from "../components/dashboard/NotificationsBlock";
import OperationDates from "../components/dashboard/OperationDates";
import StressBlock from "../components/dashboard/StressBlock";
import TemperatureBlock from "../components/dashboard/TemperatureBlock";

const Dashboard = () => {
  return (
    <div className="d-flex flex-grow-1 p-5 flex-column gap-5">
      <div className="d-flex flex-row gap-5">
        <div className="d-flex flex-column gap-5 flex-grow-1">
          <div className="d-flex flex-row gap-3">
            <BloodO2Block />
            <TemperatureBlock />
            <HRVBlock />
            <StressBlock />
          </div>
          <HeartRateMonitor />
        </div>
        <div className="d-flex flex-grow-1">
          <NotificationsBlock />
        </div>
      </div>

      <div className="d-flex flex-row justify-content-between gap-5">
        <div className="col-5">
          <GPSLocation />
        </div>
        <div className="d-flex flex-grow-1">
          <OperationDates />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
