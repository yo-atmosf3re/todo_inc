import * as React from 'react';
import { action } from '@storybook/addon-actions'
import AppWithRedux from '../AppWithRedux';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator/ReduxStoreProviderDecorator';

export default {
   title: 'AppWithRedux Component',
   component: AppWithRedux,
   decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () =>
   <AppWithRedux />

