import React, {FC, FormEvent, useEffect, useReducer, useState} from 'react';
import './App.css';
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import {ActionsType, useTodoReducer} from "./hooks/useTodoReducer";
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {ITodo} from "./model";

const App: FC = () => {

    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useReducer(useTodoReducer, JSON.parse(localStorage.getItem('todos') ?? '[]'));
    const [completedTodos, setCompletedTodos] = useReducer(useTodoReducer, JSON.parse(localStorage.getItem('completedTodos') ?? '[]'));

    const handleAddTodo = (e: FormEvent) => {
        e.preventDefault();

        if (todo.trim()){
            setTodos({type: ActionsType.ADD, payload: todo})
            setTodo('');
        }
    };

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
    }, [todos, completedTodos])

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;

        if (!destination) return;
        if (
            destination.droppableId===source.droppableId
            && destination.index === source.index
        ) return;

        let add,
            active: ITodo[] = todos,
            complete: ITodo[] = completedTodos;

        if (source.droppableId === 'TodoList'){
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        if (destination.droppableId === 'TodoList'){
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }
        setCompletedTodos({type: ActionsType.SET_ALL, payload: complete});
        setTodos({type: ActionsType.SET_ALL, payload: active});
        localStorage.setItem('todos', JSON.stringify(todos))
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <div className="App">
                <span className="heading">Список задач</span>
                <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                />
            </div>
        </DragDropContext>
    );
}

export default App;
