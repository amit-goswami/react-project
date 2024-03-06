import { useState } from "react";
import Slider from "@mui/joy/Slider";
import { Theme } from "../../../Utils/Constants";

interface SliderInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({
  min,
  max,
  step,
  value,
  onChange,
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
    onChange(newValue as number);
  };

  return (
    <div style={styles.sliderBox}>
      <Slider
        value={sliderValue}
        track="normal"
        size="lg"
        onChange={handleSliderChange}
        valueLabelDisplay="on"
      />
    </div>
  );
};

const styles = {
  sliderBox: {
    minWidth: Theme.inputElementMinWidth,
    paddingLeft: Theme.gapTiny,
    paddingRight: Theme.gapTiny,
    display: "block",
    justifyContent: "left",
  },
};

export default SliderInput;
