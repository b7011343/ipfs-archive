import React, { useState, useEffect } from 'react';
import { Grid, Box, TextField, FormControl, Button, Divider, OutlinedInput, InputAdornment, IconButton, InputLabel, FormHelperText,
         CircularProgress } from '@mui/material';
import { DriveFileMove } from '@mui/icons-material';


export const Recover = () => {
  const [cid, setCid] = useState();
  const [recoverPath, setRecoverPath] = useState();
  const [recoverActive, setRecoverActive] = useState(false);
  
  const handleChangeCid = (e) => setCid(e.target.value);

  useEffect(() => {
    window.storage.get('recoverPath').then((x) => setRecoverPath(x));
  }, []);

  useEffect(() => {
    window.storage.get('recover').then((x) => setRecoverActive(x));;
    const interval = setInterval(() => {
      window.storage.get('recover').then((x) => setRecoverActive(x));;
    }, [5000]);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container p={20} pt={24} justifyContent='center' alignItems='center'>
      <Box>
        <FormControl>
          <TextField size='small' autoFocus value={cid} onChange={handleChangeCid} disabled={recoverActive} label='Backup CID' helperText='You can find your latest backup CIDs on web3.storage' />
          <FormControl title={recoverPath} variant='outlined' sx={{ marginTop: '20px' }}>
            <InputLabel title={recoverPath} htmlFor="file-path" sx={{ marginTop: '-6px' }}>Destination Path</InputLabel>
            <OutlinedInput
              id='file-path'
              label='Destination Path'
              disabled={recoverActive}
              autoFocus
              title={recoverPath}
              value={recoverPath}
              size='small'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={recoverActive}
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
            disabled={recoverActive || !recoverPath || !cid}
            onClick={() => {
              window.storage.get('apiKey').then(async (apiKey) => {
                await window.service.recover(cid, recoverPath, apiKey);
              });
            }}
          >
            {recoverActive ? (
              <>
                <CircularProgress size={15} sx={{ marginRight: '5px' }} disableShrink variant='indeterminate'/>
                Recovery in Progress
              </>
            ) : (
              <>Start Recovery</>
            )}
          </Button>
        </FormControl>
      </Box>
    </Grid>
  );
};
