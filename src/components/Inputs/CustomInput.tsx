import {
  Box,
  FormControl,
  InputBase,
  InputProps,
  styled,
  Typography,
} from '@mui/material';
import React, { CSSProperties } from 'react';
import theme from '../../theme/theme';
import Label from '../Labels/InputLabel';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    position: 'relative',
    // border: `1px solid ${theme.palette.grey[300]}`,
    fontSize: 16,
    padding: '10px 12px',
    width: '100%',
    '&::placeholder': {
      color: theme.palette.grey[500],
      fontSize: '14px',
    },
  },
}));

type Props = InputProps & {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (
    e: React.MouseEvent,
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isRequired?: boolean;
  isEnabled?: boolean;
  isButton?: boolean;
  buttonLabel?: string;
  labelStyles?: CSSProperties;
  isDisabled?: boolean;
};

/**
 * A custom input component with label, value, and onchange props.
 * Supports additional props:
 * - onFocus: a callback function that takes a mouse event and a focus event as arguments
 * - isRequired: a boolean flag indicating whether the input is required
 * - isEnabled: a boolean flag indicating whether the input is enabled
 * - isButton: a boolean flag indicating whether to render a button next to the input
 * - buttonLabel: a string label for the button
 * - labelStyles: a CSS object for customizing the label styles
 * - isDisabled: a boolean flag indicating whether the input is disabled
 */
const CustomInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  onFocus,
  isRequired,
  isEnabled,
  isButton,
  buttonLabel,
  labelStyles,
  isDisabled,
  ...props
}) => {
  return (
    <FormControl variant="standard" fullWidth sx={styles.form}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Label label={label} style={labelStyles} />
        {isRequired && (
          <Typography variant="h6" color="red">
            {' '}
            *
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <BootstrapInput
          autoComplete="off"
          id="bootstrap-input"
          value={value}
          onChange={onChange}
          onFocus={(e) =>
            onFocus?.(e.nativeEvent as unknown as React.MouseEvent<Element>, e)
          }
          placeholder={label}
          sx={{
            ...styles.input,
            borderColor: isEnabled ? '#717BBC' : '#D0D5DD',
            backgroundColor: isDisabled ? '#F9FAFB' : '#FFFFFF',
          }}
          disabled={isDisabled}
          {...props}
        />
        {/* {isButton && (
                    <LightButton
                    label={buttonLabel}
                    onClick={() => {}}
                    style={{ marginLeft: 2, height: '100%' }}
                    />
                )} */}
      </Box>
    </FormControl>
  );
};

export default CustomInput;

const styles = {
  form: {
    width: '100%',
    mb: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '8px',
  },
};
