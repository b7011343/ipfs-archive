import React from 'react';
import { Grid, Divider, Button, Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { DataGrid } from '@mui/x-data-grid';
import columns from '../resources/homeTableColumns.json';
const test = new Date();

export const Home = () => {
  const rows = [
    { id: 0, startTime: new Date(), backupSize: 122.3, duration: 1.32 },
    { id: 1, startTime: new Date(), backupSize: 12.9, duration: 0.2 },
    { id: 2, startTime: new Date(), backupSize: 21.2, duration: 0.7 },
    { id: 3, startTime: new Date(), backupSize: 167.3, duration: 3 }
  ];

  const graphData = {
    labels: ['January',
    'February',
    'March',
    'April',
    'May',
    'June',],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  return (
    <Grid container>
      <Grid item container mb={1.5} flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Grid item container xs={4}>
          <Paper variant='outlined' sx={{ padding: '10px 15px' }}>
            <Typography variant='body2' textAlign='center'>
              Next Scheduled Backup:
              <br/>
              {test.toLocaleTimeString()}
            </Typography>
            <Grid item container mt={1} flexDirection='column' justifyContent='center' alignItems='center'>
              <Button variant='contained' sx={{ width: 'fit-content', marginBottom: '5px' }} size='small' color='primary'>
                Change
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={3} flexDirection='column' justifyContent='flex-end' alignItems='flex-end'>
          <Button variant='contained' sx={{ width: 'fit-content', marginBottom: '5px' }} size='small' color='primary'>
            Start Backup
          </Button>
          <Button variant='contained' sx={{ width: 'fit-content' }} size='small' color='primary'>
            Recover
          </Button>
        </Grid>
      </Grid>
      <Grid item container pt={1} pb={1}>
        <Divider sx={{ width: '100%' }}/>
      </Grid>
      <Grid item container>
        {/* <Line
          data={graphData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Backup Usage',
              }
            }
          }}
        /> */}
      </Grid>
      <Grid item container pt={1} pb={1}>
        <Divider sx={{ width: '100%' }}/>
      </Grid>
      <Grid item container flexDirection='column'>
        <Typography variant='p' gutterBottom>
          Backup History
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
          density='compact'
        />
      </Grid>
    </Grid>
  );
};
