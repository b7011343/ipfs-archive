import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material';


export const Settings = () => {
  const [apiKey, setApiKey] = useState();

  useEffect(() => {
    window.storage.get('apiKey').then((x) => setApiKey(x));
  }, []);

  console.log(apiKey)

  return (
    <Grid container direction='column' alignItems='flex-start' justifyContent='center'>
      <Typography gutterBottom variant='h5'>
        Settings
      </Typography>
      <TextField
        label="Web3.storage API Key"
        variant="outlined"
        type='password'
        fullWidth
        size='small'
        helperText='You can find your API key at web3.storage'
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        sx={{ margin: '15px 0' }}
      />
      <Alert severity='warning'>
        <AlertTitle>Warning</AlertTitle>
        Your API key will be used to encrypt data that is backed up. Should you wish
        to recover any backup, you must assure this key has not changed since the backup
        was performed.
      </Alert>
      <Grid mt={2} container justifyContent='flex-end'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => window.storage.set('apiKey', apiKey)}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
