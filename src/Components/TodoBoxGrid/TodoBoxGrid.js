


import React, { useContext } from 'react'


//import component

import {groupBy,TimeSorter} from './../../Helper/Helper';

import Box from './Box';
//import context
import TodoContext from './../../Contexts/TodoContext/TodoContexts';



function TodoBoxGrid() {

    const todocontext = useContext(TodoContext);
    //getting the todolist from todo context
    const { TodoLists } = todocontext;

    //grouping the todos by same day date
    let todoGP = groupBy(TodoLists, 'time');

    //sorting (day groups by day and month and year)
    todoGP = TimeSorter(todoGP,'YYYMMDD','fa',0);

    return (

        <ul className="dateGrid">
            {
                todoGP.length > 0
                    ?
                    todoGP.map((item, index) => <Box key={Date.now() + index} item={item} />)
                    :
                    <div className="w-100 text-center mt-5 text-secondary">
                        <span>
                            You dont Have any Todo
                    </span>
                    </div>

            }

        </ul>


    )
}

export default TodoBoxGrid;