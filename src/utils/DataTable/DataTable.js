import React from 'react';
import styles from './DataTable.module.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

function DataTable(props) {
  const columns = props.columns || [];
  const rows = props.rows || [];
  const rowKey = props.rowKey || '_id';
  const rowClicker = columns.find((col) => col.type === 'rowClick') || '';
  const filteredColumns = columns.filter((col) => col.type !== 'rowClick');

  const getValueForCell = (data, key) => {
    if (key.includes('.')) {
      let keysArr = key.split('.');
      return data[keysArr[0]][keysArr[1]];
    }
    return data[key];
  };
  
  return (
    <TableContainer style={{ marginTop: '4px' }} component={Paper}>
      <Table aria-label="simple table" size="medium">
        <TableHead>
          <TableRow>
            {filteredColumns.map((col) => (
              <TableCell
                key={col.label}
                className={styles.columnCell}
                align={col.align}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={getValueForCell(row, rowKey)}
              onClick={() => (rowClicker ? rowClicker.clickHandler(row) : '')}
            >
              {filteredColumns.map((col) => {
                const rowValue = getValueForCell(row, col.id);
                let value = '-';
                try {
                  switch (col.type) {
                    case 'text':
                      value = String(rowValue ?? '-');
                      break;
                    case 'callback':
                      value = col.viewStatus(row);
                      break;
                    case 'rowClick':
                      break;
                    case 'button':
                      value = (
                        <Button
                          onClick={(e) => {
                            col.clickHandler(row);
                            e.stopPropagation();
                          }}
                          variant="contained"
                          size="small"
                          color= {col.color}
                        >
                          {col.title || 'Button'}
                        </Button>
                      );
                      break;
                    case 'image':
                      value = (
                        <CardMedia
                          size="small"
                          image={row[col.id]}
                          className={styles.image}
                        />
                      );
                      break;
                    default:
                      value = `invalid-type '${col.type}'`;
                  }
                } catch (error) {
                  value = error.message;
                  console.error(error);
                }
                return (
                  <TableCell
                    key={col.id}
                    style={col.type === 'button' ? { maxWidth: '10px' } : null}
                    align={col.align}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
