import * as React from 'react';
import { action } from '@storybook/addon-actions'
import Task from '../../components/Task/Task';

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
      <Task task={{ id: '1', isDone: false, title: 'React' }}
         todolistId={'TodolistId1'}
         addTask={addTaskCallback}
         changeStatus={changeStatusCallback}
         changeTaskTitle={changeTaskTitleCallback}
         removeTask={removeTaskCallback} />
      <Task task={{ id: '2', isDone: true, title: 'JS' }}
         todolistId={'TodolistId2'}
         addTask={addTaskCallback}
         changeStatus={changeStatusCallback}
         changeTaskTitle={changeTaskTitleCallback}
         removeTask={removeTaskCallback} />
   </>
}