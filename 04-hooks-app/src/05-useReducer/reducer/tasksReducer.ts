import * as z from "zod";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number;
}

const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean()
});

const TaskStateScheme = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {

    const localStorageState = localStorage.getItem('tasks-state');

    if (!localStorageState) {
        return {
            todos: [],
            completed: 0,
            pending: 0,
            length: 0
        };
    }

    // Validar localStorage mediante Zod
    const result = TaskStateScheme.safeParse(JSON.parse(localStorageState));

    if (result.error) {
        console.log(result.error);
        return {
            todos: [],
            completed: 0,
            pending: 0,
            length: 0
        };
    }

    return result.data;
};

export type TaskAction =
    | { type: 'ADD_TODO', payload: string; }
    | { type: 'TOGGLE_TODO', payload: number; }
    | { type: 'DELETE_TODO', payload: number; };

export const taskReducer = (
    state: TaskState,
    action: TaskAction
): TaskState => {

    switch (action.type) {

        case 'ADD_TODO':
            {
                const newTodo: Todo = {
                    id: Date.now(),
                    text: action.payload,
                    completed: false
                };

                // NO MUTAR EL OBJETO
                // state.todos.push(newTodo)

                return {
                    ...state,
                    length: state.todos.length + 1,
                    todos: [...state.todos, newTodo],
                    pending: state.pending + 1
                };
            }

        case 'TOGGLE_TODO':
            {
                const updatedTodos = state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return {
                            ...todo,
                            completed: !todo.completed
                        };
                    }
                    return todo;
                });

                return {
                    ...state,
                    completed: updatedTodos.filter(todo => todo.completed).length,
                    pending: updatedTodos.filter(todo => !todo.completed).length,
                    todos: updatedTodos
                };
            }

        case 'DELETE_TODO':
            {
                const currentTodos = state.todos.filter((todo) => todo.id !== action.payload);

                return {
                    ...state,
                    length: currentTodos.length,
                    completed: currentTodos.filter(todo => todo.completed).length,
                    pending: currentTodos.filter(todo => !todo.completed).length,
                    todos: currentTodos,
                };
            }

        default:
            return state;
    }
};