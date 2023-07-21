import React from 'react';
import styles from './ErrorPage.module.css';
// import carimg from './red-cartoon.jpg'
// import brokenCar from './brokenCar.png';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className={styles.container}>
      {/* <img src={brokenCar} alt="car image" /> */}
      <h2>Page Not found</h2>
      <Link to="/dashboard">go home</Link>
    </div>
  );
}

export default ErrorPage;
