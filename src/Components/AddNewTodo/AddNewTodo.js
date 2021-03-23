import React, { useState, useContext } from 'react'

import TODOCONTEXT from './../../Contexts/TodoContext/TodoContexts';
import FormValueGetter from '../../plugin/FormDatas/FormValueGeter'
import Axxios from 'axios';
// import moment from 'moment';
import { DatePicker } from "jalali-react-datepicker";





function AddNewTodo(props) {
    const [AddStatus, AddStatusSet] = useState(false);
    //save and set time for todo
    const [time, timeSet] = useState(null);
    const TodoContext = useContext(TODOCONTEXT);


 //send and save a new todo
    let addNewTodo = (e) => {
        //stop the sending data by form to stoping the refresh 
        e.preventDefault();
        //set the loading state to true for show the loading
        TodoContext.loading(true);
        //get the all input , textarea and select box data as object by thats names
        let data = new FormValueGetter(e.target).getValue().obj;
        //do a http req by axios to save a new todo
        Axxios.post('https://todoapp-93566-default-rtdb.firebaseio.com/todo.json',{
            title: data.title,
            caption: data.caption,
            done: false,
            time: time,
        }).then(response =>{
             
            //set a todo to states by app reducers from todo context
            TodoContext.dispatch(
                {
                    typeAction: 'Add_New_Todo',
                    item: {
                        title: data.title,
                        caption: data.caption,
                        done: false,
                        time: time,
                        key:response.data.name,
                    }
                }
            )
            //set the loading state to false for hide the loading
            TodoContext.loading(false);
            AddStatusSet(false);
            e.target.reset();
         

        })
       
    }
    return (

        <>

            <div className="newTodo ">
                <span className=" basfont">
                    Add New Todo
              </span>
                <button className=" btn text-light btn-danger nofocus " onClick={
                    () => {
                        //set now time for if user dont click on date picker
                        timeSet(new Date().toJSON());
                        //set add todo state for show the box form
                        AddStatusSet(true)
                         
                    }
                }>
                    <i className="h6 fa fa-plus"></i>
                </button>
            </div>

             
                    <div className={`AddNewTodo animate__animated  ${AddStatus? 'animate__bounceInLeft' :'animate__bounceOutLeft '}`}>
                        <div className="boxTitle">
                            <span>Your Saved Todos</span>
                        </div>
                        <form className="Box" onSubmit={(e) => addNewTodo(e)}>

                            <div className="form-group ">
                                <span className="basfont ">
                                    Title
                               </span>
                                <input type="text" className="form-control col-8 nofocus" name="title" placeholder="enter a title ..." />
                            </div>

                            <div className="form-group ">
                                <span className="basfont ">
                                    Caption
                                </span>
                                <textarea name="caption" className="form-control nofocus" placeholder="enter a Caption ..."></textarea>
                            </div>
                            <div className="form-group datapicker">
                                <span className="basfont ">
                                    Date
                                </span>
                                <DatePicker onClickSubmitButton={((value) => timeSet(value.value._d.toJSON()))} />

                            </div>
                            <div className="btn-holder basfont">
                                <button className="btn btn-primary ">
                                    Save
                                </button>
                                <button className="btn btn-danger" type="button" onClick={() => AddStatusSet(false)}>
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
            




        </>
    )
}


export default AddNewTodo