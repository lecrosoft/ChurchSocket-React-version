import * as React from 'react';
import CardContainer from 'components/common/CardContainter';
import ExpenseStatisticsChart from 'components/sections/dashboard/expense/ExpenseStatisticsChart';
import { ExpenseDataType } from 'data/expense-chart';
import ReactECharts from 'echarts-for-react';
import { useChartResize } from 'providers/useEchartResize';
import { useEffect, useRef, useState, useCallback } from 'react';

const ExpenseStatistics = () => {
  const chartRef = useRef<ReactECharts>(null);
  const [chartData, setChartData] = useState<ExpenseDataType>([]);

  // Initialize user data from localStorage
  const userJson = localStorage.getItem('user-info');
  const user = userJson ? JSON.parse(userJson) : null;
  const churchId = user?.church_id || ''; // Set default to empty string if not available
  const branchId = user?.branch_id || ''; // Set default to empty string if not available

  useChartResize(chartRef);

  const fetchMaritalStatus = useCallback(async (url: string) => {
    try {
      const req = await fetch(url);
      const res = await req.json();
      return parseFloat(res.percentage.toFixed(2)); // Ensure percentage is formatted to 2 decimal places
    } catch (error) {
      console.error('Error fetching marital status:', error);
      return 0; // Return 0 if there's an error
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const singles = fetchMaritalStatus(
        `http://localhost:8000/api/users/maritalstatus/Single/${churchId}/${branchId}`,
      );
      const married = fetchMaritalStatus(
        `http://localhost:8000/api/users/maritalstatus/Married/${churchId}/${branchId}`,
      );
      const divorced = fetchMaritalStatus(
        `http://localhost:8000/api/users/maritalstatus/Divorced/${churchId}/${branchId}`,
      );
      const widows = fetchMaritalStatus(
        `http://localhost:8000/api/users/maritalstatus/Widow/${churchId}/${branchId}`,
      );

      const results = await Promise.all([singles, married, divorced, widows]);

      setChartData([
        { value: results[0], name: 'Singles', selected: true },
        { value: results[1], name: 'Married', selected: true },
        { value: results[2], name: 'Divorced', selected: true },
        { value: results[3], name: 'Widows', selected: true },
      ]);
    };

    fetchData();
  }, [churchId, branchId, fetchMaritalStatus]);

  return (
    <CardContainer title="Marital Status">
      <ExpenseStatisticsChart chartRef={chartRef} seriesData={chartData} />
    </CardContainer>
  );
};

export default ExpenseStatistics;
