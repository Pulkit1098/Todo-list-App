import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);  
    }
  }, []);

  const saveToLs = (params) => { 
    localStorage.setItem("todos", JSON.stringify(todos))
   }

   const handleAdd = ()=>{
     setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
     setTodo("")
     saveToLs();
   }
  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos);
    saveToLs();
  }
  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLs();
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  }
  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
  }

  return (
    <>
     <Navbar/>
      <div className="relative z-10 w-[40%] mx-7 ml-[30rem] bg-violet-200 my-4 rounded-xl p-5 min-h-[90vh]">
        <h1 className='font-bold text-3xl text-center'>iTask - help you manage your task</h1>
        <div className="AddTodo">
          <h2 className='text-lg font-bold my-3 mt-8'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='w-[87%] rounded-3xl py-1 px-3' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=2} className='bg-violet-800 hover:bg-violet-950 hover:cursor-pointer text-sm rounded-md p-2 py-1 mx-5 mr-0 text-white'>Add</button>
        </div>
        <div className='my-5'>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
          <h2 className='text-lg font-bold my-3'>Your ToDos</h2>
        </div>
        <div className='w-[70%] bg-black h-[1px] mx-20 my-7'></div>
        <div className="Todos">
          {todos.length ===0 && <div className='font-bold m-6 text-2xl'>No Todos to display</div>}
          {todos.map(item=>{
           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-[100%] justify-between my-4">
            <div style={{overflowWrap: 'anywhere'}} className='flex gap-6 w-1/3 flex-grow text-ellipsis'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm rounded-md p-2 py-1 mx-2 ml-5 text-white'>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm rounded-md p-2 py-1 mx-2 text-white'>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
