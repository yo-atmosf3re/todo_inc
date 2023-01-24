import { Button, IconButton, TextField, Stack } from "@mui/material"
import React, { useState, ChangeEvent, KeyboardEvent } from "react"
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';


export type AddItemFormPropsType = {
   addItem: (title: string) => void
   id: string
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
   // console.log('AddItemForm is called')
   const [title, setTitle] = useState('')
   const [error, setError] = useState<string | null>(null)

   const addItemHandler = () => {
      if (title.trim() !== '') {
         props.addItem(title.trim());
         setTitle('')
      } else {
         setError('Title is required')
      }
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null);
      }
      if (e.charCode === 13) {
         props.addItem(title);
         setTitle('')
      }
   }

   return (<div>
      <TextField
         value={title}
         onChange={onChangeHandler}
         onKeyPress={onKeyPressHandler}
         error={!!error}
         helperText={error}
         label={'Type value'}
         size='small'
         id="outlined-search"
         type="search" />
      <IconButton onClick={addItemHandler} color={'primary'} className={'button-plus'}>
         <AddBoxSharpIcon />
      </IconButton>

   </div>);
});

export default AddItemForm;