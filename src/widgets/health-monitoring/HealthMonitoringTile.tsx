import { Card, Center, Divider, Group, ScrollArea, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconDeviceLaptop, IconHeartRateMonitor } from '@tabler/icons-react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useTranslation } from 'next-i18next';
import { api } from '~/utils/api';

import { defineWidget } from '../helper';
import { WidgetLoading } from '../loading';
import { IWidget } from '../widgets';
import HealthMonitoringCpu from './HealthMonitoringCpu';
import HealthMonitoringFileSystem from './HealthMonitoringFileSystem';
import HealthMonitoringMemory from './HealthMonitoringMemory';

dayjs.extend(duration);

const defaultViewStates = ['none', 'node', 'vm', 'lxc', 'storage'] as const;
type DefaultViewState = (typeof defaultViewStates)[number];

const indicatorColorControls = ['all', 'any'] as const;
type IndicatorColorControl = (typeof indicatorColorControls)[number];

const defaultTabStates = ['system', 'cluster'] as const;
type DefaultTabStates = (typeof defaultTabStates)[number];

const definition = defineWidget({
  id: 'health-monitoring',
  icon: IconHeartRateMonitor,
  options: {
    fahrenheit: {
      type: 'switch',
      defaultValue: false,
    },
    cpu: {
      type: 'switch',
      defaultValue: true,
    },
    memory: {
      type: 'switch',
      defaultValue: true,
    },
    fileSystem: {
      type: 'switch',
      defaultValue: true,
    },
    showStorage: {
      type: 'switch',
      defaultValue: true,
    },
  },
  gridstack: {
    minWidth: 2,
    minHeight: 2,
    maxWidth: 12,
    maxHeight: 12,
  },
  component: HealthMonitoringWidgetTile,
});

export type IHealthMonitoringWidget = IWidget<(typeof definition)['id'], typeof definition>;

interface HealthMonitoringWidgetProps {
  widget: IHealthMonitoringWidget;
}
function HealthMonitoringWidgetTile({ widget }: HealthMonitoringWidgetProps) {
  const { t } = useTranslation('modules/health-monitoring');
  let {
    data: status,
    isInitialLoading: isInitLoadStats,
    isError: isErrorStatus,
  } = useStatusQuery();
  let { data: disk, isInitialLoading: isInitLoadDisk } = useDiskQuery();

  if (isInitLoadDisk || isInitLoadStats) {
    return <WidgetLoading />;
  }

  if (isErrorStatus || !status) {
    return (
      <Center>
        <Stack align="center">
          <IconAlertTriangle />
          <Title order={6}>{t('errors.general.title')}</Title>
          <Text>{t('errors.general.text')}</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <ScrollArea
      h="100%"
      styles={{
        viewport: {
          '& div[style="min-width: 100%"]': {
            display: 'flex !important',
            height: '100%',
          },
        },
      }}
    >
      <Group>
        <IconHeartRateMonitor />
        <Title order={4}>{t('descriptor.name')}</Title>
      </Group>
      {status.system && (
        <SystemStatusTile data={status.system} disk={disk} properties={widget.properties} />
      )}
    </ScrollArea>
  );
}

const SystemStatusTile = ({
  data,
  disk,
  properties,
}: {
  data: any;
  disk: any;
  properties: any;
}) => {
  const { t } = useTranslation('modules/health-monitoring');

  return (
    <Stack>
      <Card>
        <Group position="center">
          <IconDeviceLaptop size={40} />
          <Text fz="lg" tt="uppercase" fw={700} c="dimmed" align="center">
            {data.model} @ {formatUptime(data.systemInfo.uptime)}
          </Text>
        </Group>
      </Card>
      <Divider my="sm" />
      <Group position="center">
        {properties.cpu && (
          <HealthMonitoringCpu
            info={data.systemInfo}
            cpuTemp={data.cpuTemp}
            fahrenheit={properties.fahrenheit}
          />
        )}
        {properties.memory && <HealthMonitoringMemory info={data.systemInfo} />}
      </Group>
      {properties.fileSystem && disk && (
        <>
          <Divider my="sm" />
          <HealthMonitoringFileSystem fileSystem={disk} />
        </>
      )}
    </Stack>
  );
};

export const ringColor = (percentage: number) => {
  if (percentage < 70) return 'green';
  else if (percentage < 80) return 'yellow';
  else if (percentage < 90) return 'orange';
  else return 'red';
};

const useStatusQuery = () => {
  return api.healthMonitoring.fetchStatus.useQuery(undefined, {
    refetchInterval: 3000,
  });
};

const useDiskQuery = () => {
  return api.healthMonitoring.fetchDisk.useQuery();
};

export default definition;

export const formatUptime = (uptime: number) => {
  const { t } = useTranslation('modules/health-monitoring');
  const time = dayjs.duration(uptime, 's');
  return t('info.uptimeFormat', {
    days: Math.floor(time.asDays()),
    hours: time.hours(),
    minutes: time.minutes(),
  });
};
