import React, { useState } from 'react';
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

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input value={newTaskTitle}
               onChange={(e) => { setNewTaskTitle(e.currentTarget.value) }}
               onKeyPress={(e) => {
                  if (e.charCode === 13) {
                     props.addTask(newTaskTitle);
                     setNewTaskTitle('')
                  }
               }} />
            <button onClick={() => {
               props.addTask(newTaskTitle);
               setNewTaskTitle('')
            }}>+</button>
         </div>
         <ul>
            {
               props.tasks.map(t => <li><input type="checkbox" checked={t.isDone} /> <span>{t.title}</span>
                  <button onClick={() => { props.removeTask(t.id) }}>X</button>
               </li>
               )
            }
         </ul>
         <div>
            <button onClick={() => { props.changeFilter('all') }}>All</button>
            <button onClick={() => { props.changeFilter('active') }}>Active</button>
            <button onClick={() => { props.changeFilter('complited') }}>Completed</button>
         </div>
      </div>
   );
}
