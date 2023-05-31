
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
    name: "User",
    path: ROUTES.USERS,
    icon: PeopleIcon,
    submenu: [
      {
        id: 'activeUsers',
        name: 'Active Users',
        path: ROUTES.ACTIVEUSERS,
        icon: PersonIcon
      },
      {
        id: 'deactiveUsers',
        name: 'Deactive Users',
        path: ROUTES.DEACTIVEUSERS,
        icon: PersonOffIcon
      }
    ]
  },
  {
    id: "cars",
    name: "Car",
    path: ROUTES.CARS,
    icon: DriveEtaIcon,
  },
  {
    id: "bookings",
    name: "Booking",
    path: ROUTES.BOOKING,
    icon: FeaturedPlayListIcon,
  },
  {
    id: "offers",
    name: "Offer",
    path: ROUTES.OFFERS,
    icon: LocalOfferIcon
  },
];

export default NavConfig;