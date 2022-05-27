import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSensorData } from "../../context/SensorDataContext";
import AppButton from "../common/AppButton";
import AppDateTimePicker from "../common/AppDateTimePicker";
import AppText from "../common/AppText";

const TimeBlock = () => {
  const {
    latestEnvData,
    updateDataFetchMode,
    dataFetchMode,
    updateDataFetchModeToCustom,
  } = useSensorData();

  const isLive = useMemo(() => dataFetchMode === "LIVE", [dataFetchMode]);

  const [customDate, setCustomDate] = useState<number | null>(null);
  const updateData = useCallback((date: number) => setCustomDate(date), []);

  const handleClickUseCustomSnapshot = () => {
    if (customDate) {
      updateDataFetchModeToCustom(customDate);
    } else {
      toast.error("Please select a reference date.");
    }
  };
  return (
    <div className="bg-black rounded-3 p-3 d-flex flex-wrap flex-xxl-row align-items-center gap-5 w-100">
      <div className="d-flex flex-row align-items-center gap-3">
        <AppText themeColor="white" fontSize={5}>
          Last updated:
        </AppText>
        <div className="d-flex flex-column">
          <AppText themeColor="red" fontSize={6}>
            {latestEnvData.dataAvailable && latestEnvData.sensorData
              ? format(new Date(latestEnvData.sensorData.time), "yyyy-MM-dd")
              : "No live data"}
          </AppText>
          <AppText themeColor="red" fontSize={4}>
            {latestEnvData.dataAvailable && latestEnvData.sensorData
              ? format(new Date(latestEnvData.sensorData.time), "HH:mm:ss")
              : ""}
          </AppText>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-3">
        <AppButton onClick={() => updateDataFetchMode("LIVE")}>
          SHOW LIVE DATA
        </AppButton>
        <AppButton onClick={() => updateDataFetchMode("LATEST")}>
          SHOW LATEST DATA SNAPSHOT
        </AppButton>
      </div>
      <div className="d-flex flex-row align-items-center gap-3">
        <AppDateTimePicker dateChangeCallback={updateData} />
        <AppButton onClick={handleClickUseCustomSnapshot}>
          Show Custom Snapshot
        </AppButton>
      </div>
      <div
        className={`bg-${isLive ? "primary" : "white"} px-3 py-2 rounded-pill`}
      >
        <AppText themeColor={isLive ? "white" : "red"} fontSize={5}>
          {`Live Mode ${isLive ? "on" : "off"}`}
        </AppText>
      </div>
    </div>
  );
};

export default TimeBlock;
