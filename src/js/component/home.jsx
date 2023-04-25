import React, {useEffect, useState} from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	
	const [task, setTask]=useState("")
	const [todos, setTodos]=useState([])
	const apiUrl="https://assets.breatheco.de/apis/fake/todos/user/rvpacheco"
	async function loadList(){
		let response=await fetch(apiUrl)
		if (response.ok){
			let data=await response.json()
			setTodos(data)
		}
		return response.status

	}
	
	useEffect(()=>{
		
		loadList().then(async status=>{
			if(status==404){
				let response = await fetch(apiUrl, {
					method: "POST",
					body: "[]",
					headers: {
						"Content-Type": "application/json"
					}
    			})	
				if (response.ok) return loadList()
			}
		})
	},[])
	
	function addTask(e) {
  if (e.code === "Enter") {
    let newTask = { label: e.target.value, done: false };
    let newTodos = [...todos, newTask];
    fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify(newTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      setTodos(newTodos);
      e.target.value = "";
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
  }
}

	  
	  

	
function delTask(index) {
	let newTodos = [...todos];
	newTodos.splice(index, 1);
	fetch(apiUrl, {
	  method: "PUT",
	  body: JSON.stringify(newTodos),
	  headers: {
		"Content-Type": "application/json"
	  }
	})
	.then(response => {
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }
	  return response.json();
	})
	.then(data => {
	  setTodos(newTodos);
	})
	.catch(error => {
	  console.error("There was a problem with the fetch operation:", error);
	});
  }

	function checkTodo(index){
		let newTodos=[...todos]
		newTodos[index].done=!newTodos[index].done
		setTodos(newTodos)
	}


	


	return (
				<div className="card" style={{width: "18rem"}}>
					<div className="card-header">
						<input 
							type="text" 
							className="form-control border-0" 
							id="exampleFormControlInput1" 
							placeholder="Escriba una nueva tarea" 
							value={task} 
							onChange={(e)=>setTask(e.target.value)} 
							onKeyDown={addTask}
							/>
					</div>
				<ol className="list-group list-group-flush">
					{todos.map((todo,index) => 
						
						<li key = {index} className="list-group-item d-flex justify-content-between align-item">
							<div>
								<input 
								className="form-check-input me-3"
								type="checkbox"
								onChange={()=>checkTodo(index)}
								checked={todo.done}
								/>
								{todo.label}
							</div>
							
							<button className="btn btn-outline-danger btn-sm rounded-pill" onClick={()=>delTask(index)}	>X</button>
						</li> 
					)}
				</ol>
				<div className="card-footer">Tareas {todos.length}</div>
				</div>

	);
};

export default Home;
