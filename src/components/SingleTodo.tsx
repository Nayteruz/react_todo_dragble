import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import {ITodo} from "../model";
import {ArchiveBoxXMarkIcon, CheckIcon, PencilIcon} from "@heroicons/react/20/solid";
import {ActionsType, Actions} from "../hooks/useTodoReducer";
import "./styles.css"
import {Draggable} from "react-beautiful-dnd";

type TodoProps = {
    todo: ITodo;
    todos: ITodo[];
    setTodos: React.Dispatch<Actions>;
    index: number;
}

const SingleTodo: FC<TodoProps> = ({todo, todos, setTodos, index}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [edit])

    const handleCompleted = (id: number) => {
        setTodos({type: ActionsType.TOGGLE, payload: id})
        setEdit(false);
    }

    const handleRemove = (id: number): void => {
        setTodos({type: ActionsType.REMOVE, payload: id})
    }

    const handleEdit = (id: number): void => {
        if (!edit && !todo.isCompleted) {
            setEdit(!edit);
        }
    }

    const handleEditSubmit = (e: FormEvent, id: number): void => {
        e.preventDefault();
        //setTodos(prev => prev.map(todo => todo.id === id ? {...todo, todo: editTodo} : todo))
        setTodos({type: ActionsType.EDIT, payload: {id, todo: editTodo}})
        setEdit(false);
    }

    return (
        <Draggable key={todo.id} draggableId={`draggable-${todo.id}`} index={index}>
            {(provided, snapshot) => (
            <form
                className={`todos_single ${todo.isCompleted ? 'complete' : ''} ${snapshot.isDragging ? 'dragfly' : ''}`}
                onSubmit={e => handleEditSubmit(e, todo.id)}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {edit ?
                    <input
                        type="text"
                        className="todos_single--text"
                        value={editTodo}
                        ref={inputRef}
                        onChange={e => setEditTodo(e.target.value)}
                    />
                    :
                    <span
                        className="todos_single--text"
                    >
                    {todo.todo}
                </span>
                }
                <div className="icons">
                <span className="icon" onClick={() => handleEdit(todo.id)}>
                    <PencilIcon/>
                </span>
                    <span className="icon" onClick={() => handleRemove(todo.id)}>
                    <ArchiveBoxXMarkIcon/>
                </span>
                    <span className="icon" onClick={() => handleCompleted(todo.id)}>
                    <CheckIcon/>
                </span>
                </div>
            </form>
            )}
        </Draggable>
    );
};

export default SingleTodo;