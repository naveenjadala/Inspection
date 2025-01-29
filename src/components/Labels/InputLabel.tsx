import { Box, Typography } from '@mui/material';

interface Props {
  label: string;
  style?: React.CSSProperties;
}

const Label: React.FC<Props> = ({ label, style }) => {
  return (
    <Box>
      <Typography sx={{ ...style }} variant="h6">
        {label}
      </Typography>
    </Box>
  );
};

export default Label;
