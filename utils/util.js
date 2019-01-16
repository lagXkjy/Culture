function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function Time(Time){
  var a = Time
  var date = new Date(parseInt(a.slice(6)));
  var result =(date.getMonth() + 1) + '月' + date.getDate()+"日"
  console.log(result);
  return result
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function Time(Time) {
  var a = Time
  var date = new Date(parseInt(a.slice(6)));
  var result = (date.getMonth() + 1) + '月' + date.getDate() + "日" 
  console.log(result);
  return result
}
function Atime(Time) {
  var a = Time
  var date = new Date(parseInt(a.slice(6)));
  var result = (date.getMonth() + 1) + '月' + date.getDate() + "日"+' ' + date.getHours() + ':' + date.getMinutes()
  console.log(result);
  return result
}
function Altime(Time) {
  var a = Time
  var date = new Date(parseInt(a.slice(6)));
  var result = date.getFullYear() + '-' + formatNumber((date.getMonth() + 1)) + '-' + formatNumber(date.getDate()) 
  console.log(result);
  return result
}

function ACtime(Time) {
  var a = Time
  var date = new Date(parseInt(a.slice(6)));
  var result = date.getFullYear() + '年' + formatNumber((date.getMonth() + 1)) + '月' + formatNumber(date.getDate()) + '日' + formatNumber(date.getHours()) + ':' + formatNumber(date.getSeconds())
  console.log(result);
  return result
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  Time: Time,
  Atime: Atime,
  Altime: Altime,
  ACtime: ACtime
}