export default ()=>{
    const date=new Date()
    const month=date.getMonth()
    const year=date.getFullYear()
    const prevCurrent=[]
    if(month===0){
        //previous
        prevCurrent.push(`12${year-1}`)
        //current
        prevCurrent.push(`0${month+1}${year}`)
    }
    else{
        if(month < 10){
            //previous
            prevCurrent.push(`0${month}${year}`)
           //current
           prevCurrent.push(`0${month+1}${year}`)
        }
        else{
              //previous
              prevCurrent.push(`${month}${year}`)
              //current
              prevCurrent.push(`${month+1}${year}`) 
        }

    }

    return prevCurrent

}