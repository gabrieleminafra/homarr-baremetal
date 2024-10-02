import { IconArrowsUpDown } from '@tabler/icons-react';
import dynamic from 'next/dynamic';

import { defineWidget } from '../helper';
import { IWidget } from '../widgets';

const processesTile = dynamic(() => import('./Tile'), {
  ssr: false,
});

const definition = defineWidget({
  id: 'processes',
  icon: IconArrowsUpDown,
  options: {},

  gridstack: {
    minWidth: 2,
    minHeight: 2,
    maxWidth: 12,
    maxHeight: 6,
  },
  component: processesTile,
});

export type IProcessesTile = IWidget<(typeof definition)['id'], typeof definition>;

export default definition;
