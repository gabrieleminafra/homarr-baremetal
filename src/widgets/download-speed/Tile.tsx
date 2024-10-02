import { Box, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useElementSize, useListState } from '@mantine/hooks';
import { ResponsiveLine, Serie } from '@nivo/line';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useConfigContext } from '~/config/provider';
import { useColorTheme } from '~/tools/color';
import { humanFileSize } from '~/tools/humanFileSize';

import { WidgetLoading } from '../loading';
import definition, { INetworkTraffic } from './NetworkTrafficTile';
import { useGetDownloadClientsQueue } from './useGetNetworkSpeed';

interface NetworkTrafficProps {
  widget: INetworkTraffic;
}

type NetworkCurrentStats = {
  upload: number;
  download: number;
  timestamp: number;
};

export default function NetworkTraffic({ widget }: NetworkTrafficProps) {
  const { config } = useConfigContext();
  const { ref: refRoot, height: heightRoot } = useElementSize();
  const { ref: refTitle, height: heightTitle } = useElementSize();
  const { ref: refFooter, height: heightFooter } = useElementSize();
  const { primaryColor, secondaryColor } = useColorTheme();
  const { t } = useTranslation(`modules/${definition.id}`);

  const [clientDataHistory, setClientDataHistory] = useListState<NetworkCurrentStats>();

  const { data } = useGetDownloadClientsQueue();

  useEffect(() => {
    if (data) {
      setClientDataHistory.append(data);
    }

    if (clientDataHistory.length < 30) {
      return;
    }

    setClientDataHistory.remove(0);
  }, [data]);

  if (!data) {
    return null;
  }

  if (clientDataHistory.length < 5) {
    return <WidgetLoading />;
  }

  const lineChartData: Serie[] = [
    {
      id: 'Upload',
      data: clientDataHistory.map(({ upload, timestamp }) => ({
        x: timestamp,
        y: upload,
      })),
    },
    {
      id: 'Download',
      data: clientDataHistory.map(({ download, timestamp }) => ({
        x: timestamp,
        y: download,
      })),
    },
  ];

  const totalDownload = clientDataHistory.reduce((acc, n) => acc + n.download, 0);

  const totalUpload = clientDataHistory.reduce((acc, n) => acc + n.upload, 0);

  const graphHeight = heightRoot - heightFooter - heightTitle;

  const { colors } = useMantineTheme();

  return (
    <Stack ref={refRoot} style={{ height: '100%' }}>
      <Group ref={refTitle}>
        <IconDownload />
        <Title order={4}>{t('card.lineChart.title')}</Title>
      </Group>
      <Box
        style={{
          height: graphHeight,
          width: '100%',
          position: 'relative',
        }}
      >
        <Box style={{ height: '100%', width: '100%', position: 'absolute' }}>
          <ResponsiveLine
            isInteractive
            enableSlices="x"
            data={lineChartData}
            curve="basis"
            yFormat=" >-.2f"
            axisLeft={null}
            axisBottom={null}
            axisRight={null}
            enablePoints={false}
            enableGridX={false}
            enableGridY={false}
            enableArea
            colors={lineChartData.flatMap((data) =>
              data.id.toString().startsWith('upload_')
                ? colors[secondaryColor][5]
                : colors[primaryColor][5]
            )}
            fill={[{ match: '*', id: 'gradientA' }]}
            margin={{ bottom: 5 }}
            animate={false}
          />
        </Box>
      </Box>

      <Group position="apart" ref={refFooter}>
        <Group>
          <Group spacing="xs">
            <IconDownload color={colors[primaryColor][5]} opacity={0.6} size={18} />
            <Text color="dimmed" size="sm">
              {humanFileSize(totalDownload, false)}
            </Text>
          </Group>
          <Group spacing="xs">
            <IconUpload color={colors[secondaryColor][5]} opacity={0.6} size={18} />
            <Text color="dimmed" size="sm">
              {humanFileSize(totalUpload, false)}
            </Text>
          </Group>
        </Group>
      </Group>
    </Stack>
  );
}
