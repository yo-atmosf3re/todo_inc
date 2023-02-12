import { IconButton, TextField } from "@mui/material"
import React, { useState, ChangeEvent, KeyboardEvent } from "react"
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import { AddItemFormPropsType } from "./AddItemForm.types";

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({
   addItem
}) => {
   const [title, setTitle] = useState('')
   const [error, setError] = useState<string | null>(null)

   const addItemHandler = () => {
      if (title.trim() !== '') {
         addItem && addItem(title.trim());
         setTitle('')
      } else {
         setError('Title is required')
      }
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null);
      }
      if (e.charCode === 13) {
         addItem(title);
         setTitle('')
      }
   }

   return (
      <div>
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
         <IconButton
            onClick={addItemHandler}
            color={'primary'}
            className={'button-plus'}>
            <AddBoxSharpIcon />
         </IconButton>
      </div>);
});