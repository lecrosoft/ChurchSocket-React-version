import { Typography } from '@mui/material';
import Image from 'components/base/Image';
import { Fragment } from 'react/jsx-runtime';

const Logo = () => {
  const userJson = localStorage.getItem('user-info');
  const user = userJson ? JSON.parse(userJson) : null;
  return (
    <Fragment>
      <Image src="/bankdash/bankdash.svg" alt="Logo" sx={{ width: 36 }} />
      <Typography style={{ fontSize: '12px' }} variant="h6">
        {user && user.church_name}
        <p style={{ color: 'red' }}>{user ? user.branch_name : ''}</p>
      </Typography>
    </Fragment>
  );
};

export default Logo;
