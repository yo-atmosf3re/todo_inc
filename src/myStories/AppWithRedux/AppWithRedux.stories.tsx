import * as React from 'react';
import { action } from '@storybook/addon-actions'
import { App } from '../../App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ReduxStoreProviderDecorator } from '../ReduxStoreProviderDecorator/ReduxStoreProviderDecorator';

export default {
   title: 'AppWithRedux Component',
   component: App,
   decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () =>
   <App />

