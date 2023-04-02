import React from 'react'
import styles from './ErrorPage.module.css'
import carimg from './red-cartoon.jpg'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className={styles.container}>
        <img src={carimg} alt="car image" />
        <h2>Page Not found</h2>
        <Link to='/home'>go home</Link>
    </div>
  )
}

export default ErrorPage