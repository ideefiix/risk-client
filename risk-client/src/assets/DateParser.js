export function TimePassedSinceDateTime(dateTime){
    const date = Date.parse(dateTime)
    const dateNow = Date.now()
    
    const msDiff = dateNow - date
    if(msDiff <= 0) return 0
    
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24)) 
    const hours = Math.floor((msDiff / (1000 * 60 * 60) ) - days*24)
    
    let res = ""
    if(days !== 0) res = days.toString() + "d "
    if(hours !== 0) res = res + hours.toString() + "h"

    return res
}