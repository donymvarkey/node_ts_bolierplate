import os from 'os';
import config from '../config';

export const getApplicationHealth = () => {
  return {
    env: config.env,
    uptime: `${process.uptime().toFixed(2)} Second`,
    memoryUsage: {
      heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    }
  };
};

export const getSystemHealth = () => {
  return {
    cpu_usage: os.loadavg(),
    totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
    freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
  };
};

