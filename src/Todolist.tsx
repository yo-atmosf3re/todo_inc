import React, { ChangeEvent, useState } from 'react';
import { FilterValuesType } from './App';
import AddItemForm from './components/AddItemForm';

export type TaskType = {
   id: string,
   title: string,
   isDone: boolean,
}

export type PropsType = {
   title: string,
   tasks: Array<TaskType>,
   removeTask: (id: string, todolistId: string) => void
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
   filter: FilterValuesType
   id: string
   removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
   const onAllClickHandler = () => props.changeFilter('all', props.id)
   const onActiveClickHandler = () => props.changeFilter('active', props.id)
   const onComplitedClickHandler = () => props.changeFilter('complited', props.id)
   const removeTodolist = () => {
      props.removeTodolist(props.id)
   }
   const addTask = (title: string) => {
      props.addTask(title, props.id)
   }

   return (
      <div>
         <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
         <AddItemForm id={props.id} addItem={addTask} />
         <ul>
            {
               props.tasks.map(t => {
                  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                     props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                  }
                  const onRemoveHandler = () => props.removeTask(t.id, props.id)
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
      </div >
   );
}

