import * as React from 'react';
import { action } from '@storybook/addon-actions'
import { Task } from '../../components/Task';
import { TaskPriorities, TaskStatuses } from '../../api/todolists-API';

export default {
   title: 'Task Component',
   component: Task
}

const changeStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')
const addTaskCallback = action('Task added')

export const TaskBaseExample = () => {
   return <>
      <Task task={{ id: '1', status: TaskStatuses.Completed, title: 'React', todoListId: "todolistTheId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }}
         todolistId={'TodolistId1'}
         // addTask={addTaskCallback}
         changeStatus={changeStatusCallback}
         changeTaskTitle={changeTaskTitleCallback}
         removeTask={removeTaskCallback} />
      <Task task={{ id: '2', status: TaskStatuses.New, title: 'JS', todoListId: "todolistTheId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }}
         todolistId={'TodolistId2'}
         // addTask={addTaskCallback}
         changeStatus={changeStatusCallback}
         changeTaskTitle={changeTaskTitleCallback}
         removeTask={removeTaskCallback} />
   </>
}