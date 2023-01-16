import React, {FC} from 'react';
import {ITodo} from "../model";
import "./styles.css"
import SingleTodo from "./SingleTodo";
import {Actions} from "../hooks/useTodoReducer";
import {Droppable} from 'react-beautiful-dnd';

interface TodoListProps {
    todos: ITodo[];
    setTodos: React.Dispatch<Actions>;
    completedTodos: ITodo[];
    setCompletedTodos: React.Dispatch<Actions>
}

const TodoList: FC<TodoListProps> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {


    return (
        <div className="container">
            <Droppable droppableId="TodoList">
                {
                    (provided, snapshot) => (
                        <div
                            className={`todos ${snapshot.isDraggingOver? 'dragactive' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Активные задания
                            </span>
                            {todos.map((todo, index) =>
                                <SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>
            <Droppable droppableId="CompletedList">
                {
                    (provided, snapshot) => (
                        <div
                            className={`todos remove ${snapshot.isDraggingOver? 'dragcomplete' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Активные задания
                            </span>
                            {completedTodos.map((todo, index) =>
                                <SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    todos={completedTodos}
                                    setTodos={setCompletedTodos}
                                />
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    );
};

export default TodoList;