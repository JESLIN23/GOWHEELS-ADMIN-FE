import React from 'react'
import styles from './PopupLayout.module.css'

function PopupLayout(props) {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>{props.children}</div>
    </div>
  )
}

export default PopupLayout