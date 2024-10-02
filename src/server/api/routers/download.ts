import Consola from 'consola';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const downloadRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const si = require('systeminformation');

    if (!si) {
      Consola.error(`Cannot load system informations`);
      return null;
    }

    try {
      const [network] = await si.networkStats();

      return {
        upload: network.tx_sec,
        download: network.rx_sec,
        timestamp: new Date().getTime(),
      };
      return null;
    } catch (error) {
      Consola.error(`Error executing health monitoring requests(s): ${error}`);
      return null;
    }
  }),
});
