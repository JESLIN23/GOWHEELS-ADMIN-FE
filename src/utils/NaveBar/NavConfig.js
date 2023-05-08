
import { ROUTES } from "../../const";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';

const NavConfig = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: DashboardIcon,
  },
  {
    id: "users",
    name: "Users",
    path: ROUTES.USERS,
    icon: PeopleIcon,
    submenu: [
      {
        id: 'activeUsers',
        name: 'Active Users',
        path: ROUTES.USERS,
        icon: PersonIcon
      },
      {
        id: 'deactivatedUsers',
        name: 'Deactivated Users',
        path: ROUTES.DEACTIVATEDUSER,
        icon: PersonOffIcon
      }
    ]
  },
  {
    id: "cars",
    name: "cars",
    path: ROUTES.CARS,
    icon: DriveEtaIcon,
  },
  {
    id: "bookings",
    name: "Bookings",
    path: ROUTES.BOOKING,
    icon: FeaturedPlayListIcon,
  },
  {
    id: "offers",
    name: "Offers",
    path: ROUTES.OFFERS,
    icon: LocalOfferIcon
  },
];

export default NavConfig;