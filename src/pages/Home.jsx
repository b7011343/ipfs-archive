import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Divider, Button, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BackupGraph } from '../components';
import columns from '../resources/homeTableColumns.json';
const test = new Date();

export const Home = () => {
  const navigate = useNavigate();

  const rows = [
    { id: 0, startTime: new Date(), backupSize: 122.3, duration: 1.32 },
    { id: 1, startTime: new Date(), backupSize: 12.9, duration: 0.2 },
    { id: 2, startTime: new Date(), backupSize: 21.2, duration: 0.7 },
    { id: 3, startTime: new Date(), backupSize: 167.3, duration: 3 }
  ];

  return (
    <Grid container>
      <Grid item container mb={1.5} flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Grid item container xs={4}>
          <Paper variant='outlined' sx={{ padding: '10px 15px' }}>
            <Typography variant='body2' textAlign='center'>
              <b>Next Scheduled Backup:</b>
              <br/>
              {test.toLocaleTimeString()}
            </Typography>
            <Grid item container mt={1} flexDirection='column' justifyContent='center' alignItems='center'>
              <Button onClick={() => navigate('/backup')} variant='contained' sx={{ width: 'fit-content', marginBottom: '5px' }} size='small' color='primary'>
                Change
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={3} flexDirection='column' justifyContent='flex-end' alignItems='flex-end'>
          <Button onClick={() => navigate('/backup')} variant='contained' sx={{ width: 'fit-content', marginBottom: '5px' }} size='small' color='primary'>
            Backup
          </Button>
          <Button onClick={() => navigate('/recover')} variant='contained' sx={{ width: 'fit-content' }} size='small' color='primary'>
            Recover
          </Button>
        </Grid>
      </Grid>
      <Grid item container pt={1} pb={1}>
        <Divider sx={{ width: '100%' }}/>
      </Grid>
      <Grid item container>
        <BackupGraph/>
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
          pageSize={3}
          rowsPerPageOptions={[3]}
          autoHeight
          density='compact'
        />
      </Grid>
    </Grid>
  );
};
