import React from 'react';
import cx from 'clsx';
import { Cross1Icon } from '@modulz/radix-icons';
import useFocusTrap from '@charlietango/use-focus-trap';
import { DefaultProps, useMantineTheme } from '@mantine/theme';
import { useClickOutside } from '@mantine/hooks';
import ActionIcon from '../ActionIcon/ActionIcon';
import Text from '../Text/Text';
import Paper from '../Paper/Paper';
import Overlay from '../Overlay/Overlay';
import useStyles from './Modal.styles';

interface ModalProps extends DefaultProps, Omit<React.HTMLProps<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  opened: boolean;
  onClose(): void;
  hideCloseButton?: boolean;
  overlayOpacity?: number;
  modalWidth?: number;
}

export default function Modal({
  className,
  opened,
  themeOverride,
  title,
  onClose,
  children,
  hideCloseButton = false,
  overlayOpacity = 0.65,
  modalWidth = 440,
}: ModalProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme });
  const clickOutsideRef = useClickOutside(onClose);
  const focusTrapRef = useFocusTrap();

  if (!opened) {
    return null;
  }

  return (
    <div className={cx(classes.wrapper, className)}>
      <Paper
        className={classes.modal}
        shadow="sm"
        style={{ width: modalWidth }}
        ref={clickOutsideRef}
      >
        <div ref={focusTrapRef}>
          {(title || !hideCloseButton) && (
            <div className={classes.header}>
              <Text size="md">{title}</Text>
              <ActionIcon onClick={onClose}>
                <Cross1Icon />
              </ActionIcon>
            </div>
          )}
        </div>
        <div className={classes.body}>{children}</div>
      </Paper>

      <Overlay color={theme.black} opacity={overlayOpacity} />
    </div>
  );
}

Modal.displayName = '@mantine/core/Modal';