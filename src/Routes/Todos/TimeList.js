
import {jalali } from '../../Helper/Helper';
import {Link} from'react-router-dom'
function TimeList(props) {

    let time=props.item[0].time;
    let DateParam=props.DateParam
    return (
        <Link to={`/todos/${jalali(time, 'fa', 'YYYY-MM-DDD')}`} className={`date_item  
                                 ${jalali(time, 'fa', 'YYYY-MM-DDD') == (DateParam)
                ?
                'active'
                :
                ''
            }`}>
            <span>
                {jalali(time, 'fa', 'dddd')}
            </span>

            <span>
                {jalali(time, 'fa', 'MM/DDD')}
            </span>
        </Link>
    )
}

export default TimeList