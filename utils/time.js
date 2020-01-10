class Time {

  getRealtime(date){
    date.setHours(date.getHours() + 8)
    return date
  }
  //temp1-temp
    subTime (temp1,temp){
    var timesDiff = Math.abs(temp1.getTime() - temp.getTime());
    var total = (temp1.getTime() - temp.getTime()) / 1000
    var day = parseInt(total / (24 * 60 * 60))
    console.log("day is " + day)
    var afterDay = total - day * 24 * 60 * 60
    var hour = parseInt(afterDay / (60 * 60))
    console.log("hour is " + hour)
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60
    var minutes = parseInt(afterHour / 60)
    console.log("minutes is " + minutes)
    var afterMinuers = parseInt(total - day * 24 * 60 * 60 - hour * 60 * 60 - minutes * 60)
    console.log("second is " + afterMinuers)
    var time = {
      day,
      hour,
      minutes,
      afterMinuers
    }
    return time
  }
}
export{Time}