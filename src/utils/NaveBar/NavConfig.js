import { ROUTES } from '../../const';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import NoCrashSharpIcon from '@mui/icons-material/NoCrashSharp';
import CarRepairSharpIcon from '@mui/icons-material/CarRepairSharp';
import CarRentalSharpIcon from '@mui/icons-material/CarRentalSharp';
import StyleIcon from '@mui/icons-material/Style';

const NavConfig = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: DashboardIcon,
  },
  {
    id: 'users',
    name: 'User',
    path: ROUTES.USERS,
    icon: PeopleIcon,
    submenu: [
      {
        id: 'activeUsers',
        name: 'Active Users',
        path: ROUTES.ACTIVE_USERS,
        icon: PersonIcon,
      },
      {
        id: 'deactiveUsers',
        name: 'Deactive Users',
        path: ROUTES.DEACTIVE_USERS,
        icon: PersonOffIcon,
      },
    ],
  },
  {
    id: 'cars',
    name: 'Cars',
    path: ROUTES.CARS,
    icon: DriveEtaIcon,
    submenu: [
      {
        id: 'activeCars',
        name: 'Active',
        path: ROUTES.ACTIVE_CARS,
        icon: NoCrashSharpIcon,
      },
      {
        id: 'deactiveCars',
        name: 'Deactive',
        path: ROUTES.DEACTIVE_CARS,
        icon: CarRepairSharpIcon,
      },
    ],
  },
  {
    id: 'onService',
    name: 'On-Service',
    path: ROUTES.ON_SERVICE,
    icon: CarRentalSharpIcon,
  },
  {
    id: 'orders',
    name: 'Orders',
    path: ROUTES.ORDERS,
    icon: StyleIcon,
  },
  {
    id: 'bookings',
    name: 'Bookings',
    path: ROUTES.BOOKING,
    icon: FeaturedPlayListIcon,
  },
  {
    id: 'offers',
    name: 'Offers',
    path: ROUTES.OFFERS,
    icon: LocalOfferIcon,
  },
];

export default NavConfig;
