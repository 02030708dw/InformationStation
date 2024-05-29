import vndData from './vndCityData.js'
function getTimeNow(format) {
    const now = new Date();
    const options = {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  
    switch (format) {
      case 1:
        return now.toLocaleString("zh-CN", { second: "2-digit" });
      case 2:
        return now.toLocaleString("zh-CN", { minute: "2-digit", second: "2-digit" });
      case 3:
        return now.toLocaleString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      case 4:
        return now.toLocaleString("zh-CN", options);
      default:
        return "Invalid format";
    }
  }
// 1分钟倒计时
function oneminute() {
    return 60-getTimeNow(1)
}
// 菲律宾官彩
function PhAccording(date){
  let awardTime=date.slice(0,8)//截取日期
  let type=date.slice(11)//type值为1|2|3
  let year = awardTime.substring(0, 4);
  let month = awardTime.substring(4, 6);
  let day = awardTime.substring(6, 8);
  let formattedDate = year + "/" + month + "/" + day;
  if(type==1) awardTime=formattedDate+' 14:00:00'
  if(type==2) awardTime=formattedDate+' 17:00:00'
  if(type==3) awardTime=formattedDate+' 21:00:00'

  let date1 = new Date(awardTime);
  let date2 = new Date(getTimeNow(4));
  let difference = Math.abs(date1 - date2) / 1000; // 毫秒转换为秒，并取绝对值
  return difference
}
// 越南官彩
function VndAccording(date,code){
  const {text} = vndData.find(item => item.children.some(child => child.code === code));
  let awardTime=date.slice(0,8)//截取日期
  let year = awardTime.substring(0, 4);
  let month = awardTime.substring(4, 6);
  let day = awardTime.substring(6, 8);
  let formattedDate = year + "/" + month + "/" + day;
  if(text=='South') awardTime=formattedDate+' 19:15:00'
  if(text=='central') awardTime=formattedDate+' 18:15:00'
  if(text=='north') awardTime=formattedDate+' 17:15:00'
  let date1 = new Date(awardTime);
  let date2 = new Date(getTimeNow(4));
  let difference = Math.abs(date1 - date2) / 1000; // 毫秒转换为秒，并取绝对值
  return difference
  }
const vndCodeAry=()=>vndData.map(item=>item.children).flat(Infinity).map(i=>i.code)//越南所有地区
const CountdownObj = {
    oneminute: ["phOneMinute_2d","phOneMinute_3d","phOneMinute_4d","phOneMinute_6d"],//使用1分的code
    PhAccording:["ph_2d","ph_3d","ph_4d","ph_6d"],//使用官彩的code
    VndAccording:vndCodeAry()//所有越南的code
  };
const funObj={oneminute,PhAccording,VndAccording}
function countdown(code,date) {
  let i;
  for (let v in CountdownObj) if (CountdownObj[v].includes(code)) i = v;
  return funObj[i](date,code)
}

export { countdown };
