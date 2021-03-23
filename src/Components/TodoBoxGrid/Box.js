import React from 'react'
import { Link } from 'react-router-dom';
 
import { jalali } from'../../Helper/Helper';

function Box(props) {

   
      let To_Day=jalali(new Date().toJSON(), 'fa', 'YYYY-MM-DDD');
      let TodoDay= jalali(props.item[0].time, 'fa', 'YYYY-MM-DDD');
    return (
        <li key={props.item[0].key}className={ To_Day===TodoDay ? 'active' : ''   } >

            <Link to={`/todos/${TodoDay}`} >
                <span className="basfont">
                    {
                        jalali(props.item[0].time, 'en', 'dddd').slice(0, 3)
                    }
                </span>
                <span className="text-dark small ">
                    {
                        jalali(props.item[0].time, 'fa', ' YYYY')

                    }
                </span>
                <span className="text-dark  rtl">
                    {
                        jalali(props.item[0].time, 'fa', ' D MMM')
                    }
                </span>
                <b className="badge bg-danger">
                   Todo count :{props.item.length}
                </b>
            </Link>
        </li >
    )
}

export default Box;