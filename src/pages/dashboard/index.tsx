import { Grid } from '@mui/material';
import WeeklyActivity from 'components/sections/dashboard/activity/WeeklyActivity';
import BalanceHistory from 'components/sections/dashboard/balance/BalanceHistory';
import BirthdayCelebrant from 'components/sections/dashboard/celebrants/BirthdayCelebrant';
import MyCards from 'components/sections/dashboard/creditCards/MyCards';
import ExpenseStatistics from 'components/sections/dashboard/expense/ExpenseStatistics';
import InvoiceOverviewTable from 'components/sections/dashboard/invoice/InvoiceOverviewTable';
import RecentTransactions from 'components/sections/dashboard/transactions/RecentTransaction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/authentication/login');
    }
  }, []);
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3 }} mb={3}>
      {/* ------------- Card section ---------------- */}
      <Grid item xs={12} xl={8} zIndex={1}>
        <MyCards />
      </Grid>
      <Grid item xs={12} xl={4} zIndex={1}>
        <RecentTransactions />
      </Grid>

      {/* ------------- Chart section ---------------- */}
      <Grid item xs={12} lg={8} zIndex={1}>
        <WeeklyActivity />
      </Grid>
      <Grid item xs={12} lg={4}>
        <ExpenseStatistics />
      </Grid>

      {/* ------------- Slider section ---------------- */}
      <Grid item xs={12} lg={6} xxl={4} zIndex={1}>
        <BirthdayCelebrant />
      </Grid>
      <Grid item xs={12} lg={6} xxl={8} zIndex={1}>
        <BalanceHistory />
      </Grid>

      {/* ------------- Data-Grid section ---------------- */}
      <Grid item xs={12}>
        <InvoiceOverviewTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
