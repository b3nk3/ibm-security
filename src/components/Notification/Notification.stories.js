/**
 * @file Notification stories.
 * @copyright IBM Security 2019
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { components } from '../../../.storybook';

import {
  InlineNotification,
  NotificationActionButton,
  ToastNotification,
} from '../..';

const kinds = {
  'Error (error)': 'error',
  'Info (info)': 'info',
  'Success (success)': 'success',
  'Warning (warning)': 'warning',
};
const notificationProps = () => ({
  kind: select('The notification kind (kind)', kinds, 'info'),
  role: text('ARIA role (role)', 'alert'),
  title: text('Title (title)', 'Notification title'),
  subtitle: text('Subtitle (subtitle)', 'Subtitle text goes here.'),
  iconDescription: text(
    'Icon description (iconDescription)',
    'describes the close button'
  ),
  hideCloseButton: boolean('Hide close button (hideCloseButton)', false),
  onCloseButtonClick: action('onCloseButtonClick'),
});

storiesOf(components('Notifications'), module)
  .addDecorator(withA11y)
  .addDecorator(centered)
  .add('Toast', () => (
    <ToastNotification
      {...notificationProps()}
      caption={text('Caption (caption)', 'Time stamp [00:00:00]')}
      style={{ minWidth: '30rem', marginBottom: '.5rem' }}
    />
  ))
  .add('inline', () => (
    <InlineNotification
      {...notificationProps()}
      actions={
        <NotificationActionButton
          onClick={action('NotificationActionButton onClick')}
        >
          {text('Action (NotificationActionButton > children)', 'Action')}
        </NotificationActionButton>
      }
    />
  ));
