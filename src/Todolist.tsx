import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from 'react';
import { idText } from 'typescript';
import { FilterValuesType } from './App';

export type TaskType = {
   id: string,
   title: string,
   isDone: boolean,
}

export type PropsType = {
   title: string,
   tasks: Array<TaskType>,
   removeTask: (id: string) => void
   changeFilter: (value: FilterValuesType) => void
   addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
   const [newTaskTitle, setNewTaskTitle] = useState('')

   const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         props.addTask(newTaskTitle);
         setNewTaskTitle('')
      }
   }
   const addTask = () => {
      props.addTask(newTaskTitle);
      setNewTaskTitle('')
   }
   const onAllClickHandler = () => props.changeFilter('all')
   const onActiveClickHandler = () => props.changeFilter('active')
   const onComplitedClickHandler = () => props.changeFilter('complited')

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler} />
            <button onClick={addTask}>+</button>
         </div>
         <ul>
            {
               props.tasks.map(t => {
                  const onRemoveHandler = () => props.removeTask(t.id)
                  return <li key={t.id}>
                     <input type="checkbox" checked={t.isDone} />
                     <span>{t.title}</span>
                     <button onClick={onRemoveHandler}>X</button>
                  </li>
               }
               )
            }
         </ul>
         <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onComplitedClickHandler}>Completed</button>
         </div>
      </div>
   );
}
