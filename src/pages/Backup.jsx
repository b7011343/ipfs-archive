import React, { useState } from 'react';
import { Grid, Button, Typography, Paper, Divider, FormControlLabel, Checkbox, TextField, FormGroup } from '@mui/material';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { LinearProgressWithLabel } from '../components';


export const Backup = () => {
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [backupTime, setBackupTime] = useState(new Date());
  const handleChange = (e) => setBackupEnabled(e.target.checked);
  
  return (
    <Grid container flexDirection='column'>
      <Grid item container xs={12} flexDirection='row'>
        <Grid item container xs={6} flexDirection='column'>
          <Typography variant='h8' sx={{ marginBottom: '-5px' }}>
            Schedule Backups
          </Typography>
          <FormControlLabel control={<Checkbox checked={backupEnabled} onChange={handleChange} />} label="Enable" />
          <Divider sx={{ width: '95%', marginBottom: '20px' }}/>
          <FormGroup>
            <TextField disabled={!backupEnabled} type='number' margin='normal' sx={{ width: '95%', marginBottom: '30px' }} label='Backup Interval (Hours)'/>
            <DesktopTimePicker
              label='Backup Time'
              value={backupTime}
              disabled={!backupEnabled}
              onChange={(x) => setBackupTime(x)}
              renderInput={(params) => <TextField disabled={!backupEnabled} margin='normal' sx={{ width: '95%'}} {...params} />}
            />
          </FormGroup>
        </Grid>
        <Grid item container xs={6} flexDirection='column'>
          <Grid item container flexDirection='row'>
            <Grid item container xs={7} flexDirection='column'>
              <Typography variant='body2' gutterBottom>
                <b>Status:</b> Backup in progress
              </Typography>
              <LinearProgressWithLabel value={20} />
            </Grid>
            <Grid item container xs={5} justifyContent='flex-end'>
              <Button
                size='small'
                variant='contained'
                onClick={() => {
                  window.storage.get('apiKey').then((apiKey) => window.service.backup(apiKey));
                }}
              >
                Start Backup
              </Button>
            </Grid>
          </Grid>
          <Grid item container mt={2}>
            <Paper sx={{ width: '100%', padding: '10px', height: '195px' }}>
              <TextField
                multiline
                label='Backup Terminal'
                value='16:02 : Backup initialised'
                size='small'
                rows={7}
                sx={{ width: '100%', height: '100%' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12}>

      </Grid>
    </Grid>
  );
};
