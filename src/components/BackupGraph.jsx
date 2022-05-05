import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { data } from '../resources/backupGraphData';

const labels = data().map((x) => new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(x.time));

const _data = data();

const graphData = {
  labels,
  datasets: [{
    label: 'Backup Usage (GB)',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: _data,
  }]
};

export const BackupGraph = () => {
  return (
    <Line
      height='101px'
      data={graphData}
      options={{
        
      }}
    />
  )
};
