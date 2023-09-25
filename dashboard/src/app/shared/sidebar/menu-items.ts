import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  }
  ,
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/alert', // Change the path to '/component/helpdesk'
    title: 'Helpdesk',            // Change the title to 'Helpdesk'
    icon: 'fas fa-life-ring',      // Use an appropriate icon (e.g., 'bi-lifebuoy' for a lifebuoy icon)
    class: '',
    extralink: false,
    submenu: [],
  }
];
