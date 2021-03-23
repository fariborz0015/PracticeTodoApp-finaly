import { useContext } from 'react'

//import Todo Grid Box
import TodoBoxGrid from './../../Components/TodoBoxGrid/TodoBoxGrid';
//import Add new Toodo Component
import AddNewTodo from './../../Components/AddNewTodo/AddNewTodo';


//import context 

import TodoContext from './../../Contexts/TodoContext/TodoContexts'
function HomeRoute() {

    const todocontext = useContext(TodoContext)
    const { TodoDone, TodoDoneSet } = todocontext;

    let donedlength=todocontext.allTodos.filter(item => item.done==true).length
    let undonedlength=todocontext.allTodos.filter(item => item.done==false).length

    return (
        <>
            {/* Add New Todo Component */}
            <AddNewTodo />

            {/*  Todos DAte Box */}
            <div className="dateBox ">
                <div className="boxTitle">
                    <span>Your Saved Todos</span>
                </div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={`nav-link ${!TodoDone ? 'active' : ''}`} onClick={() => TodoDoneSet(false)} aria-current="page" href="#">
                            <span>
                                Undoned
                            </span>
                            <span className="badge bg-danger ml-1">
                               {undonedlength}
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${TodoDone ? 'active' : ''}`} onClick={() => TodoDoneSet(true)} aria-current="page" href="#">
                            <span>
                                Doned
                            </span>
                            <span className="badge bg-danger ml-1">
                                {donedlength}
                            </span>
                        </a>
                    </li>
                </ul>

                {/* Date Grid Todo */}
                <TodoBoxGrid />

            </div>


        </>


    )
}

export default HomeRoute