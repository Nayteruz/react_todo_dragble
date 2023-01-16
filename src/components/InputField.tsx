import React, {FC, FormEvent, useRef} from 'react';
import "./styles.css"

interface TodoProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAddTodo: (e: FormEvent) => void
}

const InputField: FC<TodoProps> = ({todo, setTodo, handleAddTodo}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className="input" onSubmit={(e) => {
            handleAddTodo(e)
            inputRef.current?.blur();
        }}>
            <input
                ref={inputRef}
                type="input"
                placeholder="Добавить задачу"
                className="input__box"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="input__submit">Go</button>
        </form>
    );
};

export default InputField;