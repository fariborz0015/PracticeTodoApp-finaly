
import { Link } from 'react-router-dom'
import { DatePicker } from "jalali-react-datepicker";
import Axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import todocontext from '../../Contexts/TodoContext/TodoContexts'
import JALALI from 'jalali-moment'
import FormValueGetter from '../../plugin/FormDatas/FormValueGeter'
function EditRoute(props) {

    let [time, timeSet] = useState();
    let [newitem, SetItem] = useState(null);
    let { key } = props.match.params;
    let TodoContext = useContext(todocontext);


    useEffect(() => {
        Axios.get(`https://todoapp-93566-default-rtdb.firebaseio.com/todo/${key}.json`)
            .then((response) => {

                SetItem({
                    key: key,
                    caption: response.data.caption,
                    done: response.data.done,
                    time: response.data.time,
                    title: response.data.title
                })

            })

    }, [])

    let editTodo = (e) => {
        //stop the sending data by form to stoping the refresh 
        e.preventDefault();
        //set the loading state to true for show the loading
        TodoContext.loading(true);
        //get the all input , textarea and select box data as object by thats names
        let data = new FormValueGetter(e.target).getValue().obj;
        //do a http req by axios to save a new todo
        Axios.put(`https://todoapp-93566-default-rtdb.firebaseio.com/todo/${key}.json`, {
            title: data.title,
            caption: data.Caption,
            done: false,
            time: newitem.time,

        }).then(response => {

            //set a todo to states by app reducers from todo context
            SetItem({
                key: key,
                title: data.title,
                caption: data.Caption,
                done: false,
                time: newitem.time,
            })
            TodoContext.dispatch({
                typeAction: 'EditTodo',
                item: {
                    key: key,
                    title: data.title,
                    caption: data.Caption,
                    done: false,
                    time: newitem.time,
                }
            })
            //set the loading state to false for hide the loading
            TodoContext.loading(false);



        })

    }









    return (
        <>


            {

                newitem !== null ?

                    <div className="AddNewTodo animate__animated animate__bounceInLeft mt-5">
                        <div className="boxTitle bg-success">
                            <span>Editing Self Todo</span>
                        </div>
                        <form className="Box" onSubmit={(e) => editTodo(e)}>

                            <div className="form-group ">
                                <span className="basfont ">
                                    Title
                        </span>
                                <input defaultValue={newitem.title} type="text" className="form-control col-8 nofocus" name="title" placeholder="enter a title ..." />
                            </div>

                            <div className="form-group ">
                                <span className="basfont ">
                                    Caption
                         </span>
                                <textarea name="Caption" className="form-control nofocus" placeholder="enter a Caption ..." defaultValue={newitem.caption}></textarea>
                            </div>
                            <div className="form-group datapicker">
                                <span className="basfont ">
                                    Date
                         </span>

                                <DatePicker value={JALALI(newitem.time).locale('fa').format('YYYY-MM-DD')} onClickSubmitButton={((value) => timeSet(value.value._d.toJSON()))} />

                            </div>
                            <div className="btn-holder basfont">
                                <button className="btn btn-primary "  >
                                    Save
                               </button>
                                <Link className="btn btn-danger text-light" type="button" to='/'  >
                                    Cancel
                                   </Link>
                            </div>

                        </form>

                    </div>


                    : ''
            }

        </>
    )
}
export default EditRoute;