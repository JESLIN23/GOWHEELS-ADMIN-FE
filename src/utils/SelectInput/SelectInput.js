import React from 'react';
import PropTypes from 'prop-types'
import styles from './SelectInput.module.css'
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectInput({
  label,
  value,
  name,
  onChange,
  valueoptions,
  variant,
  ...props
}) {

  const _onChange = event => {
    onChange(event.target.value)
  }

  return (
    <FormControl
      variant={variant ? variant : 'standard'}
      sx={{minWidth: '100%', mb: 3}}
    >
      
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value || ''}
        onChange={_onChange}
        className={styles.selectInput}
        label={label ? label : name}
        {...props}
      >
        {(valueoptions || []).map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;

SelectInput.propTyles = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    vlaueOptions: PropTypes.array,
    variant: PropTypes.string
}

