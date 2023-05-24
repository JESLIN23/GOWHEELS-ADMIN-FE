import React from 'react';
// import Loader from '../../utils/Loading/loading';
import styles from './Dashboard.module.css';
import ProtectRoute from '../../components/ProtectRoute';
import Grid from '@mui/material/Grid';
//import PersistLogin from '../../components/PersistLogin';

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
  return (
      <ProtectRoute>
        <Dashboard />
      </ProtectRoute>
  );
}

function Dashboard() {
  // const [loadingIndicator, setLoadingIndicator] = useState(false);
  // const [salesGraphData, setSalesGraphData] = useState();

  // console.log(salesGraphData);
  const datas = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  const data = {
    labels: datas.map((date) => date.year),
    datasets: [
      {
        data: datas.map((val) => val.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        label: 'Sales graph',
        position: 'bottom',
        backgroundColor: '#605ca8',
      },
    ],
  };
  // const salesReportData = useCallback( async () => {

  // }, []);

  // useEffect(() => {
  //   //  salesReportData().then();
  // }, []);

  return (
    <div className={styles.contentWrapper}>
      {/* <Loader isOpen={loadingIndicator} /> */}
      <div className={styles.titleSec}>
        <span className={styles.title}>
          Sales <span className={styles.menuName}>Dashboard</span>
        </span>
      </div>
      <div className={styles.changeable}>
        <div className={styles.secTitle}>
          <h2 className={styles.chartTitle}>Sales overview chart</h2>
        </div>
        <Grid container spacing={3}>
          <Grid item sm={12} className={styles.chart}>
            <Line data={data} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
