import React, { useState, useEffect } from 'react';
import { Grid, Box, TextField, FormControl, Button, Divider, OutlinedInput, InputAdornment, IconButton, InputLabel, FormHelperText } from '@mui/material';
import { DriveFileMove } from '@mui/icons-material';



export const Recover = () => {
  const [cid, setCid] = useState('');
  const [recoverPath, setRecoverPath] = useState();

  useEffect(() => {
    window.storage.get('recoverPath').then((x) => setRecoverPath(x));
  }, []);

  const handleChangeCid = (e) => setCid(e.target.value);

  return (
    <Grid container p={20} pt={24} justifyContent='center' alignItems='center'>
      <Box>
        <FormControl>
          <TextField size='small' autoFocus value={cid} onChange={handleChangeCid} label='Backup CID' helperText='You can find your latest backup CIDs on web3.storage' />
          <FormControl title={recoverPath} variant='outlined' sx={{ marginTop: '20px' }}>
            <InputLabel title={recoverPath} htmlFor="file-path" sx={{ marginTop: '-6px' }}>Destination Path</InputLabel>
            <OutlinedInput
              id='file-path'
              label='Destination Path'
              disabled
              autoFocus
              title={recoverPath}
              value={recoverPath}
              size='small'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      window.system.openRecoverDirDialog().then((dir) => {
                        console.log(dir)
                        setRecoverPath(dir);
                        window.storage.set('recoverPath', dir);
                      });
                    }}
                    edge="end"
                  >
                    <DriveFileMove/>
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              Location that recovered data will be stored
            </FormHelperText>
          </FormControl>
          <Divider sx={{ width: '100%', margin: '10px 0px' }}/>
          <Button
            size='small'
            variant='outlined'
            color='primary'
            onClick={() => {
              window.storage.get('apiKey').then((apiKey) => window.service.recover(cid, recoverPath, apiKey));
            }}
          >
            Start Recovery
          </Button>
        </FormControl>
      </Box>
    </Grid>
  );
};
