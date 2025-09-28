import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Construction } from 'lucide-react';

type Priority = 'low' | 'medium' | 'high' ;

type Todo = {
  id: number;
  text: string;
  priority: Priority
}

function App() {

  const [input, setInput] = useState<string>("task");
  const [priority, setPriority] = useState<Priority>("medium");

  const savedTodos = localStorage.getItem("todos");
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "All">("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  })

  function addTodo() {
    
    if (input.trim() === ""){
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("another task");
    setPriority("medium");

    console.log(newTodos)

  }

  let filteredTodos: Todo[] = [];

  if (filter === "All") {
    filteredTodos = todos;
  }else{
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }

  const highCount: number = todos.filter((t) => t.priority === "high").length ;
  const mediumCount: number = todos.filter((t) => t.priority === "medium").length ;
  const lowCount: number = todos.filter((t) => t.priority === "low").length ;
  const totalCount : number = todos.length;

  function deleteTodo(id:number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const [selctedTodos, setSelctedTodos] = useState<Set<number>>(new Set())

  function toggleSelectTodo(id: number) {
    const newSelected = new Set(selctedTodos)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    }else{
      newSelected.add(id)
    }
    setSelctedTodos(newSelected)
  }

  function finishedSelcted() {
    const newTodos = todos.filter((todo) => {
      if (selctedTodos.has(todo.id)) {
        return false;
      }else{
        return true;
      }
    })

    setTodos(newTodos);
    setSelctedTodos(new Set())
  }

  return (
      <div className="flex justify-center">
          <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
             
             <div className="flex gap-4">
                  <input 
                    type="text" 
                    className="input w-full"
                    placeholder="Add a new task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <select
                  className="select w-full"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                  <button 
                    onClick={addTodo}
                    className="btn btn-primary">
                      Add
                  </button>
             </div>
             <div className="space-y-2 flex-1 h-fit">
                 
                 <div className='flex items-center justify-between'>
                  <div className='flex flex-wrap gap-4'>
                    <button 
                      className={`btn btn-soft ${filter === "All" ? "btn-primary" : ""}`}
                      onClick={() => setFilter("All")}
                    >
                      All ({totalCount})
                    </button>

                    <button 
                      className={`btn btn-soft ${filter === "high" ? "btn-primary" : ""}`}
                      onClick={() => setFilter("high")}
                    >
                      High ({highCount})
                    </button>

                    <button 
                      className={`btn btn-soft ${filter === "medium" ? "btn-primary" : ""}`}
                      onClick={() => setFilter("medium")}
                    >
                      Medium ({mediumCount})
                    </button>

                    <button 
                      className={`btn btn-soft ${filter === "low" ? "btn-primary" : ""}`}
                      onClick={() => setFilter("low")}
                    >
                      Low ({lowCount})
                    </button>

                 </div>
                  <button
                      onClick={finishedSelcted}
                      className='btn btn-primary'
                      disabled={selctedTodos.size === 0}
                    >
                      achieve task ({selctedTodos.size})
                  </button>
                 </div>

                 {filteredTodos.length > 0 ? (
                    <ul className='divide-y divide-primary/20'>
                        { filteredTodos.map((todo) => (
                          <li key={todo.id}>
                            <TodoItem 
                              todo={todo} 
                              isSelected={selctedTodos.has(todo.id)}
                              onDelete={() => deleteTodo(todo.id)}
                              onToggleSelect={toggleSelectTodo}
                            />
                          </li>
                        )) }
                    </ul>
                 ) : (
                    <div className='flex justify-content items-center flex-col p-5'>
                      <div>
                        <Construction strokeWidth={1} className='w-40 h-40 text-primary' />
                      </div>
                      <p className='text-sm'>No task planed</p>
                    </div>
                 )}

             </div>



          </div>

          
      </div>
  )
}

export default App
