import React, { useContext } from "react";

const TodoContext = React.createContext({
    todoList: [
        {
            id: 1,
            text: 'Task 1',
            complete: false
        }
    ],
    filterValue: 'all',
    searchValue: '',
    addTodo: (todo: string) => { },
    deleteTodo: (id: number) => { },
    toggleTodo: (id: number) => { },
    updateTodo: (id: number, todo: string) => { },
    filter: (value: string) => { },
    search: (value: string) => { }

})

export const TodoProvider = TodoContext.Provider

export default function useTodo() {
    return useContext(TodoContext)
}