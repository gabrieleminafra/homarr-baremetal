import { Group, Header, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Logo } from '../Common/Logo';
import { AvatarMenu } from './AvatarMenu';

type MainHeaderProps = {
  logoHref?: string;
  showExperimental?: boolean;
  headerActions?: React.ReactNode;
  contentComponents?: React.ReactNode;
  leftIcon?: React.ReactNode;
  autoFocusSearch?: boolean;
};

export const MainHeader = ({
  showExperimental = false,
  logoHref = '/',
  headerActions,
  leftIcon,
  contentComponents,
  autoFocusSearch,
}: MainHeaderProps) => {
  const { breakpoints } = useMantineTheme();
  const isSmallerThanMd = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  const experimentalHeaderNoteHeight = isSmallerThanMd ? 60 : 30;
  const headerBaseHeight = isSmallerThanMd ? 60 + 46 : 60;
  const headerHeight = showExperimental
    ? headerBaseHeight + experimentalHeaderNoteHeight
    : headerBaseHeight;

  return (
    <Header height={headerHeight} pb="sm" pt={0} style={{ zIndex: 200 }}>
      <Group spacing="xl" mt="xs" px="md" position="apart" noWrap>
        <Group noWrap style={{ flex: 1 }}>
          {leftIcon}
          <UnstyledButton component="a" href={logoHref}>
            <Logo />
          </UnstyledButton>
        </Group>

        {/* {!isSmallerThanMd && <Search autoFocus={autoFocusSearch} />} */}

        <Group noWrap style={{ flex: 1 }} position="right">
          <Group noWrap spacing={8}>
            {contentComponents}
            {headerActions}
          </Group>
          <AvatarMenu />
        </Group>
      </Group>

      {/* {isSmallerThanMd && (
        <Center mt="xs" px="md">
          <Search isMobile />
        </Center>
      )} */}
    </Header>
  );
};
