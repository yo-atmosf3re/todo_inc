import * as React from 'react';
import { action } from '@storybook/addon-actions'
import EditableSpan from '../components/EditableSpan/EditableSpan';

export default {
   title: 'EditableSpan Component',
   component: EditableSpan
}

const callback = action('Editable span has been changed to:')

export const EditableSpanBaseExample = () => <EditableSpan title={'Example text'} onChange={callback} />
