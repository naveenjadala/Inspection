import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

interface Props {
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  radioData: string[];
}

const RadioButton: React.FC<Props> = ({
  label,
  onChange,
  value,
  radioData,
}) => {
  return (
    <FormGroup>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        {radioData.map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={<Radio sx={{ color: '#000' }} />}
            label={item}
          />
        ))}
      </RadioGroup>
    </FormGroup>
  );
};

export default RadioButton;
