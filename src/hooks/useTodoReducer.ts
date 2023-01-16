import {ITodo} from "../model";

export enum ActionsType {
    ADD = "add",
    REMOVE = "remove",
    TOGGLE = "toggle",
    EDIT = "edit",
    SET_ALL = 'set_all'
}

export type Actions =
    | { type: ActionsType.ADD, payload: string }
    | { type: ActionsType.REMOVE, payload: number }
    | { type: ActionsType.TOGGLE, payload: number }
    | { type: ActionsType.EDIT, payload: {id: number, todo: string} }
    | { type: ActionsType.SET_ALL, payload: ITodo[] }


export const useTodoReducer = (state: ITodo[], action: Actions) => {
    switch (action.type){
        case ActionsType.ADD:
            return [
                ...state,
                {id: Date.now(), todo: action.payload, isCompleted: false}
            ]
        case ActionsType.REMOVE:
            return state.filter(todo => todo.id !== action.payload)
        case ActionsType.TOGGLE:
            return state.map(todo => todo.id === action.payload ? {...todo, isCompleted: !todo.isCompleted} : todo)
        case ActionsType.EDIT:
            return state.map(td => td.id === action.payload.id ? {...td, todo: action.payload.todo} : td)
        default:
            return state;
    }
}
