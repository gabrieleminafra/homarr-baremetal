import { Center, Flex, Group, HoverCard, RingProgress, Text } from '@mantine/core';
import { IconCpu, IconThermometer } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const HealthMonitoringCpu = ({ info, cpuTemp, fahrenheit }: any) => {
  const { t } = useTranslation('modules/health-monitoring');
  const toFahrenheit = (value: number) => {
    return Math.round(value * 1.8 + 32);
  };

  interface LoadDataItem {
    label: string;
    stats: number;
    progress: number;
    color: string;
  }

  return (
    <Group position="center">
      <RingProgress
        roundCaps
        size={120}
        thickness={12}
        label={
          <Center style={{ flexDirection: 'column' }}>
            {info.cpuUtilization.toFixed(0)}%
            <HoverCard width={400} shadow="md" position="top" withinPortal>
              <HoverCard.Target>
                <IconCpu size={40} />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text fz="lg" tt="uppercase" fw={700} c="dimmed" align="center">
                  {info.cpuType}
                </Text>
                <Text fz="lg" fw={500} align="center">
                  {t('cpu.load')}: {info.cpuCurrentSpeed}
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Center>
        }
        sections={[
          {
            value: info.cpuUtilization.toFixed(0),
            color: info.cpuUtilization.toFixed(0) > 70 ? 'red' : 'green',
          },
        ]}
      />
      {cpuTemp && (
        <RingProgress
          roundCaps
          size={120}
          thickness={12}
          label={
            <Center
              style={{
                flexDirection: 'column',
              }}
            >
              {fahrenheit ? `${toFahrenheit(cpuTemp.max)}°F` : `${cpuTemp.max}°C`}
              <HoverCard width={400} shadow="md" position="top" withinPortal>
                <HoverCard.Target>
                  <IconThermometer size={40} />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text fz="lg" tt="uppercase" fw={700} c="dimmed" align="center">
                    {info.cpuType}
                  </Text>
                  <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'md' }}
                    justify={{ sm: 'center' }}
                  >
                    {cpuTemp.cores.map((core: any, index: number) => (
                      <Flex
                        direction={{ base: 'row', sm: 'column' }}
                        gap={{ base: 'sm', sm: 'md' }}
                        justify={{ base: 'flex-start', sm: 'center' }}
                        align={{ base: 'flex-start', sm: 'center' }}
                      >
                        <RingProgress
                          roundCaps
                          size={120}
                          thickness={12}
                          label={
                            <Center
                              style={{
                                flexDirection: 'column',
                              }}
                            >
                              <IconThermometer size={40} />
                            </Center>
                          }
                          sections={[
                            {
                              value: core,
                              color: core < 70 ? 'green' : 'red',
                            },
                          ]}
                        />
                        <Text fz="lg" fw={500} align="center">
                          Core {index + 1} - {fahrenheit ? `${toFahrenheit(core)}°F` : `${core}°C`}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </HoverCard.Dropdown>
              </HoverCard>
            </Center>
          }
          sections={[
            {
              value: cpuTemp.max,
              color: cpuTemp.max < 70 ? 'green' : 'red',
            },
          ]}
        />
      )}
    </Group>
  );
};

export default HealthMonitoringCpu;
