import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

interface AppDateTimePickerProps {
  dateChangeCallback: (date: number) => void;
}

const AppDateTimePicker = ({ dateChangeCallback }: AppDateTimePickerProps) => {
  const [value, setValue] = useState<Date>();

  const handleChangeDate = (newDate: Date) => {
    setValue(newDate);
    const timestamp = newDate.getTime();
    dateChangeCallback(timestamp);
  };
  return (
    <div>
      <DateTimePicker
        className="date-time-picker border border-1 border-primary bg-white rounded-1"
        maxDate={new Date()}
        onChange={handleChangeDate}
        value={value}
      />
    </div>
  );
};

export default AppDateTimePicker;
