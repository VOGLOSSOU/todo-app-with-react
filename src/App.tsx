import { useState } from 'react';

type Priority = 'low' | 'medium' | 'high' ;

type Todo = {
  id: number;
  text: string;
  priority: Priority
}

function App() {

  const [input, setInput] = useState<string>("task");
  const [priority, setPriority] = useState<Priority>("medium");

  function addTodo() {
    alert(`New todo added: ${input} with proprity ${priority}`)
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

          </div>

          
      </div>
  )
}

export default App
