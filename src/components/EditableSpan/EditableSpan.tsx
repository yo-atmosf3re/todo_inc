import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react"
import { EditableSpanPropsType } from "./EditableSpan.types";

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({
   onChange, title,
   disable
}) => {
   // console.log('EditableSpan is called')
   let [editMode, setEditMode] = useState<boolean>(false);
   let [caption, setCaption] = useState<string>('')
   const activateEditMode = () => {
      setEditMode(true);
      setCaption(title);
   }
   const activateViewMode = () => {
      setEditMode(false);
      onChange(caption);
   }
   const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setCaption(e.currentTarget.value)

   return editMode
      ? <TextField
         label={'Change value'}
         onChange={onChangeTitleHandler}
         onBlur={activateViewMode}
         value={caption}
         autoFocus
         disabled={disable}
      />
      : <span onDoubleClick={activateEditMode}>
         {title}
      </span>
})