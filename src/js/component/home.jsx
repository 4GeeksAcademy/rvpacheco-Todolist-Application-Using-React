import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [task, setTask]=useState("")
	const [todos, setTodos]=useState([])
	function addTask (e){
		if(e.code =="Enter"){
			setTodos([...todos, task]);
			setTask("");
		}

	}

	function delTask(index){
		setTodos(prevTodos => {
			const newTodos = [...prevTodos];
			newTodos.splice(index, 1);
			return newTodos;
		  });
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
				<ul className="list-group list-group-flush">
					{todos.map((todo,index) => 
						<li className="list-group-item d-flex justify-content-between align-item">
							{todo}
							<button className="btn btn-outline-danger btn-sm rounded-pill" onClick={()=>delTask(index)}	>X</button>
						</li> 
					)}
				</ul>
				<div className="card-footer">Tareas {todos.length}</div>
				</div>

	);
};

export default Home;
