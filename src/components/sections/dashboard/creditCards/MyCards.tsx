import * as React from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import SimpleBar from 'simplebar-react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CreditCard from 'components/sections/dashboard/creditCards/CreditCard';
import SearchIcon from '@mui/icons-material/Search';

interface CardData {
  theme: 'blue' | 'white' | 'green';
  data: {
    balance: string; // Changed from number to string
    title: string;
    cardHolder: string;
    validThru: string;
    cardNumber: string;
  };
  id: number;
}

const MyCards = () => {
  const userJson = localStorage.getItem('user-info');
  const user = userJson ? JSON.parse(userJson) : null;
  const currentDate = dayjs().startOf('day');
  const firstDayOfMonth = dayjs().startOf('month');
  const [incomeAmount, setIncomeAmount] = React.useState<number>(0);
  const [expenseAmount, setExpenseAmount] = React.useState<number>(0);
  const [churchId, setChurchId] = React.useState(user?.church_id);
  const [branchId, setBranchId] = React.useState(user?.branch_id);
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(firstDayOfMonth);
  const [toDate, setToDate] = React.useState<Dayjs | null>(currentDate);
  console.log(setChurchId);
  console.log(setBranchId);
  const formattedFromDate = fromDate?.format('YYYY-MM-DD');
  const formattedToDate = toDate?.format('YYYY-MM-DD');

  // Function to fetch filtered values based on the provided type
  const getFilteredValues = async (type: string) => {
    const req = await fetch(
      `http://localhost:8000/api/transaction/${type}/${churchId}/${branchId}/${formattedFromDate}/${formattedToDate}`,
    );
    const res = await req.json();
    return parseFloat(res);
  };

  // Fetch data when the component mounts or when date/church/branch changes
  React.useEffect(() => {
    filterDataByDate();
  }, [formattedFromDate, formattedToDate, churchId, branchId]);

  // Function to trigger fetching of data manually
  const filterDataByDate = () => {
    getFilteredValues('income').then(setIncomeAmount);
    getFilteredValues('expense').then(setExpenseAmount);
  };

  // Card data for display
  const cardData: CardData[] = [
    {
      id: 1,
      theme: 'blue',
      data: {
        title: 'Income',
        balance: incomeAmount.toLocaleString(), // Convert number to string with formatting
        cardHolder: 'Eddy Cusuma33',
        validThru: '12/22',
        cardNumber: '3778 **** **** 1234',
      },
    },
    {
      id: 2,
      theme: 'white',
      data: {
        title: 'Expense',
        balance: expenseAmount.toLocaleString(), // Convert number to string with formatting
        cardHolder: 'Jane Doe',
        validThru: '01/24',
        cardNumber: '1234 **** **** 5678',
      },
    },
    {
      id: 3,
      theme: 'green',
      data: {
        title: 'Balance',
        balance: (incomeAmount - expenseAmount).toLocaleString(), // Convert number to string with formatting
        cardHolder: 'Jane Doe',
        validThru: '01/24',
        cardNumber: '1234 **** **** 5678',
      },
    },
  ];

  return (
    <React.Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pt: 3, pb: 2.5 }}
      >
        <Typography
          sx={{
            fontSize: { xs: 'body2.fontSize', md: 'h6.fontSize', xl: 'h3.fontSize' },
            fontWeight: 600,
          }}
        >
          Analysis
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={2}>
            <DatePicker
              value={fromDate}
              onChange={(date: Dayjs | null) => setFromDate(date?.startOf('day') || null)}
            />
            <DatePicker
              value={toDate}
              onChange={(date: Dayjs | null) => setToDate(date?.startOf('day') || null)}
            />
            <Box>
              <div>
                <Button
                  variant="contained"
                  size="large"
                  onClick={filterDataByDate} // Manually trigger data fetching
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                >
                  <SearchIcon />
                </Button>
              </div>
            </Box>
          </Stack>
        </LocalizationProvider>
      </Stack>

      <SimpleBar style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Stack direction="row" justifyContent="space-between" gap={4} sx={{ minWidth: 800 }}>
          {cardData.map((card) => (
            <CreditCard key={card.id} theme={card.theme} cardData={card.data} />
          ))}
        </Stack>
      </SimpleBar>
    </React.Fragment>
  );
};

export default MyCards;
