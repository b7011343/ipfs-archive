import React, { useState, useEffect, useRef } from 'react';
import { Grid, Button, Typography, Paper, Divider, FormControlLabel, Checkbox, TextField, FormGroup,
         Card, CardActions, CardContent, IconButton, Stack, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { DeleteOutline, AddBox } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { LinearProgressWithLabel } from '../components';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Backup = () => {
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [backupActive, setBackupActive] = useState(false);
  const [backupTime, setBackupTime] = useState(new Date());
  const [backupDirList, setBackupDirList] = useState([]);
  const [backupLog, setBackupLog] = useState([]);
  const [backupProgress, setBackupProgress] = useState(0);
  const [backupStatus, setBackupStatus] = useState('');

  const handleChange = (e) => setBackupEnabled(e.target.checked);
  const addDir = (dir) => setBackupDirList([...backupDirList, dir]);
  const removeDir = (dir) => setBackupDirList(backupDirList.filter((x) => x !== dir ));

  useEffect(() => {
    window.storage.get('backupDirList').then((x) => x && setBackupDirList(x));
  }, []);

  useEffect(() => {
    window.storage.set('backupDirList', backupDirList);
  }, [backupDirList]);

  useEffect(() => {
    window.storage.get('backupLog').then((x) => setBackupLog(x || []));
    window.storage.get('backup').then((x) => setBackupActive(x || false));
    window.storage.get('backupProgress').then((x) => setBackupProgress(x || 0));
    window.storage.get('backupStatusMessage').then((x) => setBackupStatus(x || ''));

    const interval = setInterval(() => {
      console.log('Update backup log')
      window.storage.get('backupLog').then((x) => setBackupLog(x || []));
      window.storage.get('backup').then((x) => setBackupActive(x || false));
      window.storage.get('backupProgress').then((x) => setBackupProgress(x || 0));
      window.storage.get('backupStatusMessage').then((x) => setBackupStatus(x || ''));
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
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
                <b>Status:</b> {backupStatus}
              </Typography>
              <LinearProgressWithLabel value={backupProgress} />
            </Grid>
            <Grid item container xs={5} justifyContent='flex-end'>
              <Button
                size='small'
                variant='contained'
                disabled={backupDirList.length < 1 || backupActive}
                onClick={() => {
                  window.storage.set('backupLog', []);
                  setBackupLog([]);
                  window.storage.get('apiKey').then((apiKey) => window.service.backup(apiKey, backupDirList));
                }}
              >
                Start Backup
              </Button>
            </Grid>
          </Grid>
          <Grid item container mt={2}>
            <Paper variant='outlined' sx={{ width: '100%', padding: '10px', height: '195px', overflow: 'auto' }}>
              <Typography variant='h8' gutterBottom sx={{ marginLeft: '10px' }}>
                Backup Log
              </Typography>
              <List dense>
                {backupLog && backupLog.map((x) => (
                  <ListItem sx={{ paddingTop: '0', paddingBottom: '0' }}>
                    <ListItemIcon>
                      <b>{'>_'}</b>
                    </ListItemIcon>
                    <ListItemText
                      primary={x}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} mt={2} sx={{ width: '100%', maxHeight: '325px' }} flexDirection='column'>
        <Card>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', paddingBottom: '0' }}>
            <Typography gutterBottom sx={{ marginBottom: '10px' }}>Backed Up Directories</Typography>
            <Stack spacing={1} sx={{ maxHeight: '225px', height: 'auto', width: '100%', overflowY: 'auto', padding: '0 5px' }}>
              {backupDirList && backupDirList.length > 0 ? backupDirList.map((x, i) => (
                <Item key={i}>
                  {x}
                  <IconButton
                    color='default'
                    onClick={() => removeDir(x)}
                  >
                    <DeleteOutline/>
                  </IconButton>
                </Item>
              )) : (
              <Item>
                  No directories
              </Item>
              )}
            </Stack>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size='small'
              startIcon={<AddBox/>}
              variant='contained'
              color='inherit'
              onClick={() => {
                window.system.openRecoverDirDialog().then((x) => {
                  addDir(x);
                });
              }}
            >
              Add
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
