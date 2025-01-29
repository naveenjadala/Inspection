import {
  Box,
  Button,
  Divider,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CardLayout from '../../layouts/CardLayout';
import React, { useEffect, useReducer } from 'react';
import { MenuBook, LocalPhone } from '@mui/icons-material';
import CustomSelect from '../../components/Select/CustomSelect';
import InputType from './components/InputType';

const sharedBoxStyles = {
  width: { xs: '100%', sm: '50%' },
  padding: 2,
};

const dataTypes = [
  { value: 'input', label: 'Input', icon: <MenuBook /> },
  { value: 'select', label: 'Select', icon: <MenuBook /> },
  { value: 'checkbox', label: 'Checkbox', icon: <LocalPhone /> },
  { value: 'radio', label: 'Radio' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'datetime-local', label: 'Date and Time' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'tel', label: 'Phone Number' },
  { value: 'file', label: 'File' },
  { value: 'search', label: 'Search' },
  { value: 'toggle', label: 'Toggle' },
  { value: 'dropdown', label: 'Dropdown' },
];

// const tableData = [
//   {
//     id: 1,
//     field_library: 'Name',
//     data_type: 'Input',
//   },
//   {
//     id: 2,
//     field_library: 'Email',
//     data_type: 'Input',
//   },
//   {
//     id: 3,
//     field_library: 'Phone',
//     data_type: 'Input',
//   },
//   {
//     id: 4,
//     field_library: 'Address',
//     data_type: 'Input',
//   },
//   {
//     id: 5,
//     field_library: 'Date',
//     data_type: 'Date',
//   },
//   {
//     id: 6,
//     field_library: 'Time',
//     data_type: 'Time',
//   },
//   {
//     id: 7,
//     field_library: 'Checkbox',
//     data_type: 'Checkbox',
//   },
//   {
//     id: 8,
//     field_library: 'Radio',
//     data_type: 'Radio',
//   },
//   {
//     id: 9,
//     field_library: 'Dropdown',
//     data_type: 'Dropdown',
//   },
//   {
//     id: 10,
//     field_library: 'Toggle',
//     data_type: 'Toggle',
//   },
// ];

export const Template = () => {
  const [value, setValue] = React.useState<string>('');
  const [tableData, setTableData] = React.useState([]);
  const [fieldData, setFieldData] = React.useState({
    name: '',
    dataType: '',
    fieldValidationRules: '',
    options: [],
  });

  useEffect(() => {
    getFieldData();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

  const handleCreateField = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(fieldData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:5001/fields', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const getFieldData = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:5001/fields', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setTableData(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };

  const renderDataType = () => {
    switch (value) {
      case 'input':
        return <InputType setFieldData={setFieldData} />;
      case 'select':
        return (
          <CustomSelect options={dataTypes} label="Select" value={value} />
        );
      case 'checkbox':
        return (
          <CustomSelect options={dataTypes} label="Checkbox" value={value} />
        );
      case 'radio':
        return <CustomSelect options={dataTypes} label="Radio" value={value} />;
    }
  };

  const handleSave = () => {
    handleCreateField();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        p: 3,
      }}
    >
      <Typography variant="h3">Template Fields</Typography>
      <CardLayout>
        <Typography variant="h4">Add and Manage Data Fields</Typography>
        <Typography variant="body2">
          Here you can add and manage data fields for the template.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexGrow: 1 }}
        >
          {/* CustomSelect */}
          <Box sx={sharedBoxStyles}>
            <CustomSelect
              options={dataTypes}
              label="Select"
              value={value}
              onChange={handleChange}
            />
            {renderDataType()}
            <Button
              variant="contained"
              sx={{ mt: 2, display: 'flex', justifySelf: 'flex-end' }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>

          {/* Scrollable Table */}
          <Box
            sx={{
              ...sharedBoxStyles,
              flexGrow: 1,
              overflowY: 'auto',
              paddingBottom: 5,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '70vh',
              p: 2,
            }}
          >
            <Paper sx={{ width: '100%' }}>
              <TableContainer component={Box} sx={{}}>
                <Table stickyHeader sx={{ minWidth: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>S.no</TableCell>
                      <TableCell>Field Library</TableCell>
                      <TableCell>Data Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.dataType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </CardLayout>
    </Box>
  );
};
