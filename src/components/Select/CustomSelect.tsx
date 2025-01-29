import React from 'react';
import {
  Box,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from '@mui/material';
import Label from '../Labels/InputLabel';
import theme from '../../theme/theme';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    position: 'relative',
    backgroundColor: '#fff',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    width: '100%',
    '&:focus': {
      borderRadius: '8px',
    },
  },
}));

interface CustomSelectProps {
  label: string;
  value?: string;
  options?: { label: string; value: string }[];
  onChange?: (event: SelectChangeEvent<string>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isRequired?: boolean;
  isEnabled?: boolean;
  isReadOnly?: boolean;
  labelStyles?: React.CSSProperties;
  labelKey?: string;
  name?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value = '',
  options = [],
  onChange,
  onFocus,
  isRequired = false,
  isEnabled = true,
  isReadOnly = false,
  labelStyles,
  labelKey = 'name',
  name,
  placeholder,
  ...props
}) => {
  return (
    <FormControl fullWidth sx={{ width: '100%', mb: 2 }} variant="standard">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Label label={label} style={labelStyles} />
        {isRequired && (
          <Typography variant="h6" color="red" sx={{ ml: 0.5 }}>
            *
          </Typography>
        )}
      </Box>
      <Select
        name={name}
        value={value}
        onChange={!isReadOnly ? onChange : undefined} // Disable onChange if read-only
        input={<BootstrapInput />}
        onFocus={onFocus}
        aria-labelledby={`${label}-label`}
        {...props}
        sx={{
          borderRadius: '8px',
          border: `1px solid ${theme.palette.grey[300]}`,
          borderColor: isEnabled ? 'var(--Gray-blue-400, #c7c7c7)' : 'none',
        }}
        disabled={!isEnabled}
        displayEmpty
        MenuProps={{
          MenuListProps: {
            style: {
              maxHeight: 250,
              overflowY: 'auto',
            },
          },
          PaperProps: {
            style: {
              maxHeight: 250,
              overflowY: 'auto',
            },
          },
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
        }}
      >
        {/* Fix Placeholder Behavior */}
        <MenuItem value="" disabled>
          {placeholder || 'Select an option'}
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.grey[200], // Change hover background color
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
