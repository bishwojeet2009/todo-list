import React, { useContext } from "react";

const TodoContext = React.createContext({
    todoList: [
        {
            id: 0,
            text: '',
            complete: false
        }
    ],
    filterValue: '',
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