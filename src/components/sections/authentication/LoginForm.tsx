import { Button, Grid, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { up } = useBreakpoints();
  const upSM = up('sm');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const items = { email, password };
  const handleClick = async () => {
    const req = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    });
    const res = await req.json();
    console.log(res.message);
    console.log(res.data);
    if (res.message === 'success') {
      localStorage.setItem('user-info', JSON.stringify(res.data));
      navigate('/');
    } else {
      alert(res.message);
    }
  };
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 2.5 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={upSM ? 'medium' : 'small'}
            name="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={upSM ? 'medium' : 'small'}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <IconifyIcon icon={showPassword ? 'majesticons:eye' : 'majesticons:eye-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" sx={{ my: 3 }}>
        <Grid item>
          <Link href="/authentication/forget-password" variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Button
        fullWidth
        size={upSM ? 'large' : 'medium'}
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Login
      </Button>
    </>
  );
};

export default LoginForm;
