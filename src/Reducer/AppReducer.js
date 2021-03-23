

function AppReducer(prevState, Action) {

    switch (Action.typeAction) {
        case "Add_New_Todo":

            return Add_New_Todo(prevState, Action)
        case "Get_Todo":

            return Get_Todo(prevState, Action)
        case "Done_Todo":

            return Done_Todo(prevState, Action)
        case "Delete_Todo":

            return Delete_Todo(prevState, Action)
        case "EditTodo":

            return EditTodo(prevState, Action)

        default:
            break;
    }

}

let Add_New_Todo = (prevState, Action) => {

    return {
        ...prevState,
        TodoLists: [...prevState.TodoLists,
        {
            title: Action.item.title,
            done: Action.item.done,
            caption: Action.item.caption,
            time: Action.item.time,
            key: Action.item.key
        }
        ]
    }
}
let Get_Todo = (prevState, Action) => {

    return {
        ...prevState,
        TodoLists: [...Action.TodoLists

        ]
    }
}

let Done_Todo = (prevState, Action) => {
    let key = Action.item.key;


    let Done = Action.item.done;

    let item = prevState.TodoLists.find(item => item.key === key);
    item.done = Done;

    let newlist = prevState.TodoLists.filter(item => item.key !== key);

    return {
        ...prevState,
        TodoLists: [...newlist, item],
        allTodos: [...newlist, item]


    }

}

let EditTodo = (prevState, Action) => {
    let key = Action.item.key;



    let newlist = prevState.TodoLists.filter(item => item.key !== key);

    return {
        ...prevState,
        TodoLists: [...newlist,Action.item],
        allTodos: [...newlist, Action.item]


    }

}




let Delete_Todo = (prevState, Action) => {
    let key = Action.item.key;

    let item = prevState.TodoLists.find(item => item.key === key);

    let newlist = prevState.TodoLists.filter(item => item.key !== key);

    return {
        ...prevState,
        TodoLists: [...newlist],
        allTodos: [...newlist]


    }

}
export default AppReducer