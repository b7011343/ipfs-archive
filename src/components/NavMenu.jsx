import React from 'react';
import { List, Box, ListItem, ListItemIcon, Divider, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import navMenuData from './data/NavMenu';


const activeStyle = {
  textDecoration: 'none',
  color: 'black',
  textDecorationThickness: '50px'
};

const inactiveStyle = {
  textDecoration: 'none',
  color: 'black'
};

const NavItem = ({ title, link, icon }) => {
  return (
    <NavLink
      to={link}
      style={({ isActive }) => isActive ? activeStyle : inactiveStyle}
    >
      {({ isActive }) => (
        <ListItem button selected={isActive}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      )}
    </NavLink>
  )
};

export const NavMenu = () => {
  return (
    <List sx={{ width: '160px' }}>
      {navMenuData.map((x, i) => (
        <NavItem
          key={i}
          title={x.title}
          link={x.link}
          icon={x.icon}
        />
      ))}
    </List>
  );
};
