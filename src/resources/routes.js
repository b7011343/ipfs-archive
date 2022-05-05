import { Home, Backup, Recover, Settings } from '../pages';

const routes = [
  {
    name: "Home",
    route: "/",
    element: <Home/>
  },
  {
    name: "Backup",
    route: "/backup",
    element: <Backup/>
  },
  {
    name: "Recover",
    route: "/recover",
    element: <Recover/>
  },
  {
    name: "Settings",
    route: "/settings",
    element: <Settings/>
  }
];

export default routes;
