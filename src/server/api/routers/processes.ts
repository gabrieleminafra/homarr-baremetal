import Consola from 'consola';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const processesRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const si = require('systeminformation');

    if (!si) {
      Consola.error(`Cannot load system informations`);
      return null;
    }

    try {
      const processes = await si.processes();

      return {
        processes: processes.list
          .filter((process: any) => process.state == 'sleeping')
          .slice(0, 30),
      };
    } catch (error) {
      Consola.error(`Error executing health monitoring requests(s): ${error}`);
      return null;
    }
  }),
});
