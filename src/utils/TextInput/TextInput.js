import React from 'react'
import { TextField } from '@mui/material'
import PropTypes from 'prop-types'
import styles from './TextInput.module.css'

function TextInput({
  value,
  name,
  label,
  error,
  onChange,
  onBlur,
  type,
  ...props
}) {

  // const _onChange = event => {
  //   onChange(event.target.value)
  // }
  return (

    <TextField
      id='standard-basic'
      label= {label ? label : name}
      name= {name || ''}
      variant='outlined'
      type={type ? type : 'text'}
      fullWidth
      onChange={onChange}
      onBlur={onBlur}
      error={Boolean(error)}
      helperText={error || null}
      value={value}
      className={styles.input}
      style={{marginBottom: '1rem'}}
      {...props}
    />

  )
}

export default TextInput;

TextInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.number,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  onBlur: PropTypes.func
}
