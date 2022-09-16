import * as React from 'react';
import AddItemForm from "../components/AddItemForm/AddItemForm";

export default {
   title: 'AddItemForm Component',
   component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) => {
   return <AddItemForm id='2' addItem={(title: string) => (alert(title))} />
}