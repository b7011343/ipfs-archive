import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import navMenuData from '../resources/navMenu';


const NavItem = ({ title, link, icon }) => {
  return (
    <NavLink
      to={link}
      style={{ textDecoration: 'none', color: 'black' }}
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
