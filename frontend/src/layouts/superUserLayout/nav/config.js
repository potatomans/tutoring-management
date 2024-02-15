// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Users',
    path: '/superuser/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Pairings',
    path: '/superuser/pairings',
    icon: icon('ic_user'),
  },
  {
    title: 'Tutors',
    path: '/superuser/tutors',
    icon: icon('ic_user'),
  },
  {
    title: 'Tutees',
    path: '/superuser/tutees',
    icon: icon('ic_user'),
  },
];

export default navConfig;
