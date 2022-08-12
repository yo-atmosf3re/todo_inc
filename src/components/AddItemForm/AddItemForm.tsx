import { Button, TextField } from "@mui/material"
import React, { useState, ChangeEvent, KeyboardEvent } from "react"

export type AddItemFormPropsType = {
   addItem: (title: string) => void
   id: string
}

function AddItemForm(props: AddItemFormPropsType) {
   const [newTaskTitle, setNewTaskTitle] = useState('')
   const [error, setError] = useState<string | null>(null)
   const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.charCode === 13) {
         props.addItem(newTaskTitle);
         setNewTaskTitle('')
      }
   }
   const addTask = () => {
      if (newTaskTitle.trim() !== '') {
         props.addItem(newTaskTitle.trim());
         setNewTaskTitle('')
      } else {
         setError('Field is required')
      }
   }
   return (<div>
      <TextField value={newTaskTitle}
         onChange={onNewTitleChangeHandler}
         onKeyPress={onKeyPressHandler}
         error={!!error} helperText={error} label={'Type value'} size='small' id="outlined-search" type="search" />
      <Button size="large" color={'primary'} variant={"contained"} onClick={addTask} className={'button-plus'}>+</Button>
   </div>);
}

export default AddItemForm;