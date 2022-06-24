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
   changeTaskStatus: (taskId: string, isDone: boolean) => void
   filter: FilterValuesType
}

export function Todolist(props: PropsType) {
   const [newTaskTitle, setNewTaskTitle] = useState('')
   const [error, setError] = useState<string | null>(null)

   const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.charCode === 13) {
         props.addTask(newTaskTitle);
         setNewTaskTitle('')
      }
   }
   const addTask = () => {
      if (newTaskTitle.trim() !== '') {
         props.addTask(newTaskTitle.trim());
         setNewTaskTitle('')
      } else {
         setError('Field is required')
      }
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
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''} />
            <button onClick={addTask} className={'button-plus'}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
         </div>
         <ul>
            {
               props.tasks.map(t => {
                  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                     props.changeTaskStatus(t.id, e.currentTarget.checked);
                  }
                  const onRemoveHandler = () => props.removeTask(t.id)
                  return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                     <input type="checkbox"
                        onChange={onChangeHandler}
                        checked={t.isDone} />
                     <span>{t.title}</span>
                     <button onClick={onRemoveHandler}>X</button>
                  </li>
               }
               )
            }
         </ul>
         <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'complited' ? 'active-filter' : ''} onClick={onComplitedClickHandler}>Completed</button>
         </div>
      </div>
   );
}
