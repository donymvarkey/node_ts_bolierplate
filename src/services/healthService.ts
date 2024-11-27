import { getApplicationHealth, getSystemHealth } from '../utils/common';

export const getServerHealthDetails = () => {
  return {
    application: getApplicationHealth(),
    system: getSystemHealth(),
    timestamp: Date.now()
  };
};
