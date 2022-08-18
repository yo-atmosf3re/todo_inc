export type StateType = {
   age: number
   childrenCount: number
   name: string
}

export type ActionType = {
   type: string
   [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): any => {
   switch (action.type) {
      case 'INCREMENT-AGE':
         state.age = state.age + 1;
         return state;
      case 'INCREMENT-CHILDREN-COUNT':
         state.childrenCount = state.childrenCount + 1;
         return state;
      default:
         throw new Error("I don't understand this type")
   }
}