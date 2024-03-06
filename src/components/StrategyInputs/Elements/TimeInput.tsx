import { useState } from "react";
import { Theme } from "../../../Utils/Constants";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface DatePickerProps {
  label: string;
  minTime: Date;
  maxTime: Date;
  defaultTime: Date;
  onChange: (date: Date) => void;
}

function TimeInput({
  label,
  onChange,
  minTime,
  maxTime,
  defaultTime,
}: DatePickerProps) {
  const [time, setTime] = useState<Date | null>(defaultTime);

  function handleDateChange(dateValue: Date | null, _: any) {
    setTime(dateValue);
    onChange(dateValue || defaultTime);
  }

  return (
    <div style={styles.dateBox}>
      <TimePicker
        label={label}
        value={time}
        onChange={handleDateChange}
        timezone="UTC"
        minTime={minTime}
        timeSteps={{ hours: 1, minutes: 1 }}
        maxTime={maxTime}
      />
    </div>
  );
}

const styles = {
  dateBox: {
    minWidth: Theme.inputElementMinWidth,
    margin: Theme.gapTiny,
    color: Theme.colors.black70,
  },
};

export default TimeInput;
