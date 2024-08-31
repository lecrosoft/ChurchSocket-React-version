export type ExpenseDataType = { value: number; name: string; selected: boolean }[];

const fetchMaritalStatus = async (url: string): Promise<number> => {
  try {
    const req = await fetch(url);
    const res = await req.json();
    return parseFloat(res.percentage.toFixed(2)); // Convert to 2 decimal places
  } catch (error) {
    console.error('Error fetching marital status:', error);
    return 0; // Return 0 in case of an error
  }
};

export const fetchExpenseData = async (): Promise<ExpenseDataType> => {
  const singles = await fetchMaritalStatus(
    `http://localhost:8000/api/users/maritalstatus/Single/1/1`,
  );
  const married = await fetchMaritalStatus(
    `http://localhost:8000/api/users/maritalstatus/Married/1/1`,
  );
  const divorced = await fetchMaritalStatus(
    `http://localhost:8000/api/users/maritalstatus/Divorced/1/1`,
  );
  const widow = await fetchMaritalStatus(`http://localhost:8000/api/users/maritalstatus/Widow/1/1`);

  const expenseData: ExpenseDataType = [
    { value: singles, name: 'Singles', selected: true },
    { value: married, name: 'Married', selected: true },
    { value: divorced, name: 'Divorced', selected: true },
    { value: widow, name: 'Widows', selected: true },
  ];

  return expenseData;
};
