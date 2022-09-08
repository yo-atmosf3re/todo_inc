import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react"

export type EditableSpanPropsType = {
   title: string
   onChange: (newValue: string) => void
}

// ? Доделать тудулист 1:17:13

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
   console.log('EditableSpan is called')
   let [editMode, setEditMode] = useState<boolean>(false);
   let [title, setTitle] = useState<string>('')
   const activateEditMode = () => {
      setEditMode(true);
      setTitle(props.title);
   }
   const activateViewMode = () => {
      setEditMode(false);
      props.onChange(title);
   }
   const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

   return editMode
      ? <TextField label={'Change value'} onChange={onChangeTitleHandler} onBlur={activateViewMode} value={title} autoFocus />
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
})

export default EditableSpan;