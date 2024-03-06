import { useState } from "react";
import { Theme } from "../../../Utils/Constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DatePickerProps {
  label: string;
  minDate: Date;
  maxDate: Date;
  defaultDate: Date;
  onChange: (date: Date) => void;
}

function DateInput({
  label,
  onChange,
  minDate,
  maxDate,
  defaultDate,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | null>(defaultDate);

  function handleDateChange(dateValue: Date | null, _: any) {
    setDate(dateValue);
    onChange(dateValue || defaultDate);
  }

  return (
    <div style={styles.dateBox}>
      <DatePicker
        label={label}
        value={date}
        timezone="UTC"
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

const styles = {
  dateBox: {
    minWidth: Theme.inputElementMinWidth,
    margin: Theme.gapTiny,
  },
};

export default DateInput;
