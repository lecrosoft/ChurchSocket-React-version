import { SvgIconProps } from '@mui/material';
import CreditCardIcon from 'components/icons/menu-icons/CreditCardIcon';
import HomeIcon from 'components/icons/menu-icons/HomeIcon';
import InvestIcon from 'components/icons/menu-icons/InvestIcon';
import LoanIcon from 'components/icons/menu-icons/LoanIcon';
import ServiceIcon from 'components/icons/menu-icons/ServiceIcon';
import SettingsIcon from 'components/icons/menu-icons/SettingsIcon';
import SignInIcon from 'components/icons/menu-icons/SignInIcon';
import SignUpIcon from 'components/icons/menu-icons/SignUpIcon';
import TransferIcon from 'components/icons/menu-icons/TransferIcon';
import UserIcon from 'components/icons/menu-icons/UserIcon';

export enum linkEnum {
  Dashboard = 'dashboard',
  People = 'people',
  Event = 'events',
  Wallet = 'wallet',
  PrayerRequest = 'prayer request',
  Testimonies = 'testimonies',
  Services = 'Services',
  Setting = 'Setting',
  Login = 'login',
  Signup = 'sign-up',
  ForgetPassword = 'forget-password',
  ResetPassword = 'reset-password',
}

export interface MenuLinkType {
  id: number;
  title: string;
  link: string;
  icon?: (props: SvgIconProps) => JSX.Element;
  available: boolean;
}
export const menuLinks: MenuLinkType[] = [
  {
    id: 1,
    title: linkEnum.Dashboard,
    link: '/',
    icon: HomeIcon,
    available: true,
  },
  {
    id: 2,
    title: linkEnum.People,
    link: '/members',
    icon: UserIcon,
    available: true,
  },
  {
    id: 3,
    title: linkEnum.Event,
    link: 'events',
    icon: TransferIcon,
    available: false,
  },
  {
    id: 4,
    title: linkEnum.Wallet,
    link: '#!',
    icon: InvestIcon,
    available: false,
  },
  {
    id: 5,
    title: linkEnum.PrayerRequest,
    link: '#!',
    icon: CreditCardIcon,
    available: false,
  },
  {
    id: 6,
    title: linkEnum.Testimonies,
    link: '#!',
    icon: LoanIcon,
    available: false,
  },
  {
    id: 7,
    title: linkEnum.Services,
    link: '#!',
    icon: ServiceIcon,
    available: false,
  },
  {
    id: 8,
    title: linkEnum.Setting,
    link: '#!',
    icon: SettingsIcon,
    available: false,
  },
  {
    id: 9,
    title: linkEnum.Login,
    link: '/authentication/login',
    icon: SignInIcon,
    available: true,
  },
  {
    id: 10,
    title: linkEnum.Signup,
    link: '/authentication/sign-up',
    icon: SignUpIcon,
    available: true,
  },
];
