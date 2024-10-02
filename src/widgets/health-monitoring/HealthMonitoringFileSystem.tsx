import { Center, Flex, Group, HoverCard, RingProgress, Text } from '@mantine/core';
import { IconServer } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { humanFileSize } from '~/tools/humanFileSize';

import { ringColor } from './HealthMonitoringTile';

const HealthMonitoringFileSystem = ({ fileSystem }: any) => {
  const { t } = useTranslation('modules/health-monitoring');

  interface FileSystemDisk {
    devicename: string;
    used: string;
    percentage: number;
    available: number;
  }

  const sortedFileSystem = fileSystem.slice().sort((a: FileSystemDisk, b: FileSystemDisk) => {
    return a.devicename.localeCompare(b.devicename);
  });

  return (
    <Group position="center">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'center' }}
      >
        {sortedFileSystem.map((disk: FileSystemDisk) => (
          <Flex
            direction={{ base: 'row', sm: 'column' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ base: 'flex-start', sm: 'center' }}
            align={{ base: 'flex-start', sm: 'center' }}
          >
            <RingProgress
              size={120}
              roundCaps
              thickness={12}
              label={
                <Center style={{ flexDirection: 'column' }}>
                  <HoverCard width={280} radius="sm" position="top-end" withinPortal>
                    <HoverCard.Target>
                      <IconServer size={40} />
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Text fz="lg" tt="uppercase" fw={700} c="dimmed" align="center">
                        {t('fileSystem.available', {
                          available: humanFileSize(disk.available),
                          percentage: 100 - disk.percentage,
                        })}
                      </Text>
                    </HoverCard.Dropdown>
                  </HoverCard>
                </Center>
              }
              sections={[
                {
                  value: disk.percentage,
                  color: ringColor(disk.percentage),
                  tooltip: disk.used,
                },
              ]}
            />
            <Text>{disk.devicename}</Text>
          </Flex>
        ))}
      </Flex>
    </Group>
  );
};

export default HealthMonitoringFileSystem;
