import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Divider, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import columns from '../resources/homeTableColumns.json';

const test = new Date();

export const Home = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const apiKey = await window.storage.get('apiKey');
      console.log(apiKey);
      axios.get('https://api.web3.storage/user/uploads', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
      .then((res) => {
        console.log(res.data);
        const _rows = res.data.map((x, i) => ({
          id: i,
          cid: x.cid,
          uploadTime: x.created
        }));
        setRows(_rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };
    fetch();
  }, []);

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
          <Button onClick={() => navigate('/recover')} variant='outlined' sx={{ width: 'fit-content' }} size='small' color='primary'>
            Recover
          </Button>
        </Grid>
      </Grid>
      <Grid item container pt={1} pb={1} mb={2}>
        <Divider sx={{ width: '100%' }}/>
      </Grid>
      <Grid item container flexDirection='column'>
        <Typography variant='p' gutterBottom>
          Backup History
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSize={9}
          rowsPerPageOptions={[9]}
          autoHeight
          density='compact'
        />
      </Grid>
    </Grid>
  );
};
