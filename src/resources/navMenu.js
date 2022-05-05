import { Home, CloudCircle as Backup, Restore as Recover, Settings } from '@mui/icons-material';

const navMenuData = [
  {
    "title": "Home", 
    "link": "/",
    "icon": <Home/>
  },
  {
    "title": "Backup", 
    "link": "/backup",
    "icon": <Backup/>
  },
  {
    "title": "Recover", 
    "link": "/recover",
    "icon": <Recover/>
  },
  {
    "title": "Settings", 
    "link": "/settings",
    "icon": <Settings/>
  }
];

export default navMenuData;
