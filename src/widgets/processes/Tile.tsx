import { Group, Stack, Title, useMantineTheme } from '@mantine/core';
import { IconTerminal } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import Terminal from 'react-terminal-ui';

import { WidgetLoading } from '../loading';
import definition from './ProcessesTile';
import { useGetProcesses } from './useGetProcesses';

export default function ProcessesTile() {
  const { t } = useTranslation(`modules/${definition.id}`);

  const { data } = useGetProcesses();

  const { colors } = useMantineTheme();
  if (!data) {
    return <WidgetLoading />;
  }

  return (
    <Stack style={{ height: '100%' }}>
      <Group>
        <IconTerminal />
        <Title order={4}>{t('descriptor.name')}</Title>
      </Group>
      <Terminal height="100%">
        {data.processes.map((process: any) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{`${process.pid} - ${process.name} `}</span>
            <span style={{ textAlign: 'right' }}>{`${process.cpu}%`}</span>
          </div>
        ))}
      </Terminal>
    </Stack>
  );
}
