import React, { useState, useCallback, useEffect } from 'react';
import Loader from '../../utils/Loading/loading';
import styles from './Dashboard.module.css';
import PageStyles from '../PageStyles.module.css';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AlertContextHook from '../../hooks/AlertContextHook';
import OrderServices from '../../services/OrderServices';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { styled } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  return <Dashboard />;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: '1px solid #C6C6C6',
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  width: 150,
  color: theme.palette.grey[800],
  '&:hover, .&Mui-selected': {
    backgroundColor: 'red',
  },
}));

function Dashboard() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [salesGraphData, setSalesGraphData] = useState([]);
  const [year, setYear] = useState(2023);

  const { postErrorAlert } = AlertContextHook();

  const getGraphData = (city) => {
    const data =
      (salesGraphData || []).find((data) => data._id === city)?.months || {};
    const monthCount = labels.map((label) => data[label] || 0);
    return monthCount;
  };

  const handleChangeYear = (event, nextView) => {
    if (nextView === year) {
      return;
    }
    setYear(nextView);
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const mergedData = [
    ...getGraphData('calicut'),
    ...getGraphData('kochi'),
    ...getGraphData('malappuram'),
  ];
  const maxValue = Math.max(...mergedData);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `Sales chart based on cities in ${year}`,
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        max: maxValue,
        min: 0,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Calicut',
        data: getGraphData('calicut'),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Kochi',
        data: getGraphData('kochi'),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Malappuram',
        data: getGraphData('malappuram'),
        borderColor: 'rgb(34, 198, 49)',
        backgroundColor: 'rgba(34, 198, 49, 0.5)',
      },
    ],
  };

  const salesReportData = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      const resp = await OrderServices.orderGraph(year);
      setSalesGraphData(resp);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [year]);

  useEffect(() => {
    salesReportData();
  }, [year]);

  return (
    <div className={PageStyles.contentWrapper}>
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <span className={PageStyles.title}>
          Sales <span className={PageStyles.menuName}>Dashboard</span>
        </span>
      </div>
      <div className={PageStyles.changeable}>
        <div className={PageStyles.secTitle}>
          <h2 className={styles.chartTitle}>Sales overview chart</h2>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9} className={styles.chart}>
            <Line options={options} data={data} />
          </Grid>
          <Grid item xs={12} md={3} className={styles.yearContainer}>
            <StyledToggleButtonGroup
              orientation="vertical"
              value={year}
              exclusive
              onChange={handleChangeYear}
            >
              <StyledToggleButton value={2022} aria-label="list">
                2022
              </StyledToggleButton>
              <StyledToggleButton value={2023} aria-label="module">
                2023
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
