import { Card } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
}

const defaultStyles = {
  display: 'flex',
  flexDirection: 'column',
  padding: 3,
  flexGrow: 1,
};

const CardLayout: React.FC<Props> = ({ children, customStyles = {} }) => {
  return <Card sx={{ ...defaultStyles, ...customStyles }}>{children}</Card>;
};

export default CardLayout;
