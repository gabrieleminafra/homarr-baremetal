import Consola from 'consola';

import { createTRPCRouter, publicProcedure } from '../../trpc';

export const healthMonitoringRouter = createTRPCRouter({
  fetchStatus: publicProcedure.query(async () => {
    const si = require('systeminformation');

    if (!si) {
      Consola.error(`Cannot load system informations`);
      return null;
    }

    try {
      const results = await Promise.all([
        await si.time(),
        await si.chassis(),
        await si.cpu(),
        await si.cpuCurrentSpeed(),
        await si.currentLoad(),
        await si.mem(),
        await si.cpuTemperature(),
      ]);

      const [time, system, cpu, currSpeed, load, mem, cpuTemp] = results;

      return {
        system: {
          model: `${system.manufacturer} ${system.model}`,
          systemInfo: {
            uptime: time.uptime,
            cpuType: `${cpu.manufacturer} ${cpu.brand}@${cpu.speed}`,
            cpuCurrentSpeed: currSpeed.avg,
            cpuUtilization: load.currentLoad,
            memTotal: mem.total,
            memAvailable: mem.available,
          },
          cpuTemp: {
            max: cpuTemp.max || 0,
            cores: cpuTemp.cores,
          },
        },
      };
    } catch (error) {
      Consola.error(`Error executing health monitoring requests(s): ${error}`);
      return null;
    }
  }),
  fetchDisk: publicProcedure.query(async () => {
    const si = require('systeminformation');

    if (!si) {
      Consola.error(`Cannot load system informations`);
      return null;
    }

    try {
      const results = await Promise.all([await si.fsSize(), await si.blockDevices()]);

      const [fileSystems, blocks] = results;

      const parsedFs = fileSystems.map((fs: any) => {
        const match = blocks.find((block: any) => fs.fs == block.name);
        if (match) return { ...fs, ...match };
      });

      return parsedFs.map((fs: any) => ({
        devicename: fs.label,
        used: fs.used,
        percentage: fs.use,
        available: fs.size - fs.used,
      }));
    } catch (error) {
      Consola.error(`Error executing health monitoring requests(s): ${error}`);
      return null;
    }
  }),
});
