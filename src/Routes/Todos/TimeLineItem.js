
import { jalali } from '../../Helper/Helper';
import { useContext } from 'react';
import TodoContext from './../../Contexts/TodoContext/TodoContexts';
import Axios from 'axios';
import {Link} from 'react-router-dom';
function TimeLineItem(props) {

    let item = props.item;
    let key = item.key;

    let todocontext = useContext(TodoContext);


    let DoneTodo = (key, Done) => {
        todocontext.loading(true)

        Axios.put(`https://todoapp-93566-default-rtdb.firebaseio.com/todo/${key}.json`, {
            done: true,
            caption: item.caption,
            title: item.title,
            time: item.time,

        }).then((response) => {
            todocontext.dispatch({
                typeAction: 'Done_Todo',
                item: {
                    key: key,
                    done: Done
                }
            })
            todocontext.loading(false)
        })

    }
    let Delete_Todo = (key) => {
        todocontext.loading(true)

        Axios.delete(`https://todoapp-93566-default-rtdb.firebaseio.com/todo/${key}.json`)
            .then((response) => {
                todocontext.dispatch({
                    typeAction: 'Delete_Todo',
                    item: {
                        key: key,

                    }
                })
                todocontext.loading(false)
            })

    }
    return (
        <li className={`TimeLine-Item ${item.done ? 'active' : ''}`} key={item.key}>
            <span className="clock ">{jalali(item.time, 'fa', 'HH:mm')}</span>
            <span className="title"> {item.title} </span>
            <div className={`TimeLine-caption alert ${item.done ? 'alert-primary' : 'alert-warning'}`}>
                {item.caption}
            </div>
            <div className="TimeLine-actions">
                <Link to={`/edit/${key}`} className="btn btn-warning">
                    Edit
             </Link>

                <button className="btn btn-danger" onClick={() => Delete_Todo(key)}>
                    Delete
             </button>

                {
                    item.done ?
                        <button className="btn btn-primary" onClick={() => DoneTodo(key, false)}>
                            Undone
                   </button>
                        :
                        <button className="btn btn-success" onClick={() => DoneTodo(key, true)}>
                            done
                   </button>
                }
            </div>
        </li>

    )
}



export default TimeLineItem