import React from 'react';
import cx from 'clsx';
import oc from 'open-color';
import { DefaultProps, OpenColorTheme, OPEN_COLOR_THEMES } from '@mantine/types';
import classes from './Badge.styles.less';

interface BadgeProps extends DefaultProps {
  theme?: OpenColorTheme;
  children: React.ReactNode;
}

export default function Badge({ className, theme = 'gray', children, style }: BadgeProps) {
  const ocTheme = OPEN_COLOR_THEMES.includes(theme) ? theme : 'gray';
  return (
    <div
      data-composable
      className={cx(classes.badge, className)}
      style={{ ...style, backgroundColor: oc[ocTheme][0], color: oc[ocTheme][7] }}
    >
      {children}
    </div>
  );
}

Badge.displayName = '@mantine/core/Badge';