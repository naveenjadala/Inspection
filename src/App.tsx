import { NavLink, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import './App.scss';
import { useState } from 'react';
import {
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaServicestack,
} from 'react-icons/fa';
import { Menu } from '@mui/icons-material';
import { Template } from './pages/Template/Template';
import { FormBuilder } from './pages/FormBuilder/FormBuilder';
import { FieldLibrary } from './pages/FieldLibrary/FieldLibrary';
import { Box, IconButton, Typography } from '@mui/material';
import { IconType } from 'react-icons';

const App = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const SidebarItem: React.FC<{
    itemName: string;
    Icon: IconType;
    link: string;
  }> = ({ itemName, Icon, link }) => {
    return (
      <>
        <NavLink className="sidebar-link" to={link}>
          <Icon
            className="icon"
            size={18}
            style={{
              marginRight: isSidebarCollapsed ? 0 : 10,
            }}
          />
          {isSidebarCollapsed ? null : (
            <Typography variant="body1">{itemName}</Typography>
          )}
        </NavLink>
      </>
    );
  };

  return (
    <div className="app">
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: 'white',
            display: 'flex',
            width: '100%',
            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
          }}
        >
          <Menu />
        </IconButton>
        <ul>
          <li>
            <SidebarItem itemName="DashBoard" Icon={FaHome} link="/" />
          </li>
          <li>
            <SidebarItem
              itemName="Template"
              Icon={FaInfoCircle}
              link="/template"
            />
          </li>
          <li>
            <SidebarItem
              itemName="FormBuilder"
              Icon={FaServicestack}
              link="/form-builder"
            />
          </li>
          <li>
            <SidebarItem
              itemName="FieldLibrary"
              Icon={FaPhoneAlt}
              link="/field-library"
            />
          </li>
        </ul>
      </div>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/template" element={<Template />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/field-library" element={<FieldLibrary />} />
        </Routes>
      </>
    </div>
  );
};

export default App;
