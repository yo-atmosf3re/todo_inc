// import { FilterValuesType, TodolistTypes } from '../App.types';
// import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, TodolistDomainType, todolistsReducer } from './todolists-reducer';
// import { v1 } from 'uuid';

// test.skip('correct todolist should be removed', () => {
//    let todolistId1 = v1();
//    let todolistId2 = v1();

//    const startState: Array<TodolistDomainType> = [
//       { id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, },
//       { id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, }
//    ]

//    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1 })

//    expect(endState.length).toBe(1);
//    expect(endState[0].id).toBe(todolistId2);
// });

// test.skip('correct todolist should be added', () => {
//    let todolistId1 = v1();
//    let todolistId2 = v1();

//    let newTodolistTitle = "New Todolist";

//    const startState: Array<TodolistDomainType> = [
//       { id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, },
//       { id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, }
//    ]

//    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

//    expect(endState.length).toBe(3);
//    expect(endState[2].title).toBe("What to buy");
//    expect(endState[2].filter).toBe('all')
// });

// test.skip('correct todolist should change its name', () => {
//    let todolistId1 = v1();
//    let todolistId2 = v1();

//    let newTodolistTitle = "New Todolist";

//    const startState: Array<TodolistDomainType> = [
//       { id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, },
//       { id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, }
//    ]

//    const action = {
//       type: 'CHANGE-TODOLIST-TITLE' as const,
//       id: todolistId2,
//       title: newTodolistTitle
//    };

//    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

//    expect(endState[0].title).toBe("What to learn");
//    expect(endState[1].title).toBe("What to buy");
// });

// test.skip('correct filter of todolist should be changed', () => {
//    let todolistId1 = v1();
//    let todolistId2 = v1();

//    let newFilter: FilterValuesType = "completed";

//    const startState: Array<TodolistDomainType> = [
//       { id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, },
//       { id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, }
//    ]

//    const action = {
//       type: 'CHANGE-TODOLIST-FILTER' as const,
//       id: todolistId2,
//       filter: newFilter
//    };

//    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

//    expect(endState[0].filter).toBe("all");
//    expect(endState[1].filter).toBe(newFilter);
// });

export { }