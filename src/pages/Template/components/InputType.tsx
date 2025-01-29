import React, { useCallback } from 'react';
import CustomInput from '../../../components/Inputs/CustomInput';
import RadioButton from '../../../components/RadioButtons/RadioButton';
import CustomSelect from '../../../components/Select/CustomSelect';
import { Box } from '@mui/material';

interface Props {
  setFieldData: React.Dispatch<React.SetStateAction<any>>;
}

const InputType: React.FC<Props> = ({ setFieldData }) => {
  const [value, setValue] = React.useState('');
  const [radioValue, setRadioValue] = React.useState('Single Line');
  const [labelName, setLabelName] = React.useState('');

  const updateFieldData = useCallback(() => {
    const fieldValidationRules = JSON.stringify({
      inputType: radioValue,
      inputFormat: value,
    });
    setFieldData((prev: any) => ({
      ...prev,
      dataType: 'Input',
      name: labelName,
      fieldValidationRules,
    }));
  }, [[setFieldData, radioValue, value, labelName]]);

  React.useEffect(() => {
    updateFieldData();
  }, [updateFieldData]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelName(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#f5f5f5',
        padding: 3,
        marginTop: 3,
        borderRadius: 2,
      }}
    >
      <CustomInput
        label="Label Name"
        placeholder="Label Name"
        onChange={handleLabelChange}
        value={labelName}
      />
      <RadioButton
        onChange={(e) => setRadioValue(e.target.value)}
        value={radioValue}
        radioData={['Single Line', 'Multi Line']}
      />
      <CustomSelect
        onChange={(e) => setValue(e.target.value)}
        options={[
          { value: 'numeric', label: 'Numeric' },
          { value: 'Alpha-Numeric', label: 'Alpha-Numeric' },
          { value: 'Alphabetic', label: 'Alphabetic' },
        ]}
        label="Input Format"
        placeholder="Input Format"
        value={value}
      />
    </Box>
  );
};

export default InputType;
