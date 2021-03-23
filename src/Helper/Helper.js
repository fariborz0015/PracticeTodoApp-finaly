

import JALALI from 'jalali-moment'


// convert json date to jalali years-month-day 
let jalali = (time, locale, format) => {
    return JALALI(time).locale(locale).format(format)
}

//a function to grouping the todos  by sam say data (this use the jalali date)
function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {

        val = jalali(collection[i][property], "fa", "YYYY-MM-DD");
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

let TimeSorter = (Colection,DateFormat,DateLocale,index)=>{
    if(index!==false){
        return Colection.sort((a, b) => {
            return parseInt(jalali(a[index].time, DateLocale, DateFormat)) - parseInt(jalali(b[index].time,DateLocale, DateFormat))
        })
    }else{
        return Colection.sort((a, b) => {
            return parseInt(jalali(a.time, DateLocale, DateFormat)) - parseInt(jalali(b.time,DateLocale, DateFormat))
        })
    }

}



export { jalali, groupBy,TimeSorter }