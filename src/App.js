
import './App.css';
import { useState, useReducer, useEffect } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

//import Components
import Axios from 'axios'
//import Header
import Header from './Components/Header/Header';


//import reducers

import AppReducer from './Reducer/AppReducer'

//import Rotes;
//import Home Route
import HomeRoute from './Routes/Home/Home'
//import Edit Route
import EditRoute from './Routes/Edit/Edit'
//import todo list Route
import TodoList from './Routes/Todos/TodoList'


//import Contextes
import TodoContext from './Contexts/TodoContext/TodoContexts'


function App() {


  const [loading, loadingSet] = useState(true);
  const [TodoDone, TodoDoneSet] = useState(false);
  const [state, dispatch] = useReducer(AppReducer, {
    TodoLists: []
  });


  useEffect(() => {

    Axios.get("https://todoapp-93566-default-rtdb.firebaseio.com/todo.json").then((response) => {
      let newtodos = []
      response.data != null ?
        Object.entries(response.data).map(item => {
          newtodos = [...newtodos, {
            key: item[0],
            caption: item[1].caption,
            done: item[1].done,
            time: item[1].time,
            title: item[1].title
          }
          ]
        })
        : newtodos = [];

      dispatch({
        typeAction: 'Get_Todo',
        TodoLists: [...newtodos]
      })
      loadingSet(false)
    })

  }, [])




  return (
    <TodoContext.Provider value={
      {
        loading: loadingSet,
        TodoLists: state.TodoLists.filter(item => item.done == TodoDone),
        dispatch,
        TodoDone: TodoDone,
        TodoDoneSet: TodoDoneSet,
        allTodos: state.TodoLists,

      }
    }>


      <BrowserRouter>
        <div className={`mobile_row m-0  bg-white shadow-sm mx-auto h-100 p-0 ${loading ? 'loading' : ''}`}>

          {/* header  */}
          <Header />

          {/* Home Route */}
          <Route path="/" exact component={HomeRoute} />

          {/* Edit Route */}
          <Route path="/edit/:key" exact component={EditRoute} />
          {/* Todolist Route */}
          <Route path="/Todos/:date" exact component={TodoList} />

        </div>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App;
