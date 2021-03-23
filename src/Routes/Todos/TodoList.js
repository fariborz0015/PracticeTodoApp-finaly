import { useContext } from 'react';
import todoContext from '../../Contexts/TodoContext/TodoContexts'
import { jalali, groupBy, TimeSorter } from '../../Helper/Helper';

import TimeList from './TimeList'
import TimeLineItem from './TimeLineItem';
function TodoList(props) {
    let TodoLists = useContext(todoContext).allTodos;
   

    
    //if url params  is not valid and cant find any todo  moving user to Home page
    if(TodoLists.length<1){
      window.location.href ='/'
    }


    let DateParam = props.match.params.date;
    let OtherDate = groupBy(TodoLists, 'time');
    
    OtherDate=TimeSorter(OtherDate,'YYYMMDD','fa',0)
    //filter todos by thats date and url date param
    let TodoinDate = TodoLists.filter(item => jalali(item.time, 'fa', 'YYYY-MM-DDD') == DateParam)
   
    //sort todos by thats clock time param
    TodoinDate = TimeSorter(TodoinDate, 'HHmm', 'fa', false);

    return (
        <>
            <ul className="Date_Header">
                {
                    OtherDate.length > 0 ?
                        OtherDate.map((item) => {
                            return (
                                <TimeList item={item} DateParam={DateParam} />
                            )
                        })
                        : "not found"
                }


            </ul>

            <div className="TimelineContainer">
                <div className="d-flex align-items-center w-100 " >
                    <h5 className="basfont  mx-2 mr-2 d-inline">
                        {jalali(TodoinDate[0].time, 'en', 'dddd')}
                    </h5>

                    <div className="d-flex  flex-row ">
                        <span className="  small TimelineDate mx-1   " >
                            {jalali(TodoinDate[0].time, 'fa', 'MMM')}
                        </span>
                        <span className="  small TimelineDate  mx-0 ">
                            {jalali(TodoinDate[0].time, 'fa', 'DD ')}
                        </span>
                    </div>


                </div>

                <ul className="TimeLine">
                    {
                        TodoinDate.map((item,index) => <TimeLineItem item={item} key={index+Math.random()+Date.now()}/>)
                    }
                    <li className="EndTimeLine">End</li>
                </ul>

            </div>
        </>
    )
}

export default TodoList