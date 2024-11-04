import { get,post } from './request.js'
import { getG,postG } from './Grequest.js'

export const getUserInfo=(memberId)=>get(`/kioskSetting/getInfo/${memberId}`)//获取会员信息

export const getGameGodList=()=>get(`/material/collect/account/dropdownBox/client`)//获取大神列表

export const getGameGodArticle=(data)=>post(`/material/collect/new/client/page`,data)//获取单个大神文章

export const getCommentList=(data)=>get(`/material/collect/new/comment/page/main/client`,data)

export const getChildCommentList=(data)=>get(`/material/collect/new/comment/page/secondary/client`,data)
// 资讯站
// =========================================================================================================

// =========================================================================================================
// GW


// export const getGameInfo=()=>getG(`/material/listAll`)//获取gw游戏 已弃用

export const getGame=()=>getG(`/aia/game`)//获取地区与游戏

export const getGameTrend=(data,str)=>postG(`/material/get${str}Trend`,data)//获取走势图str=Ph|Th|Vnd

export const getGameAward=(data)=>postG(`/material/getAwardNum`,data)//获取奖期信息 

export const getGamePlay=()=>getG(`/aia/gamePlay/trend`)// 获取所有玩法按类型

export const getTime=()=>getG(`/api/time/baidu`)//获取时间用于定位越南地区

export const getShortDraw=(data)=>getG(`/aia/shortTicket?merchantCode=${data.merchantCode}`)//获取短频开奖号码

export const getLongDraw=(data)=>getG(`aia/longTicket`,data)//获取长频

export const getPhAward=(data)=>getG(`/material/getAwardNum/ph?gameCode=${data.code}&gameId=${data.gameId}`)//获取菲律宾往期奖期信息

export const getTrialGameList=(data)=>getG(`/aia/trial/gameList`,data) //游戏试玩列表 未携带分享id

export const getshareGameList=(data)=>getG(`/aia/share/gameList`,data) //分享游戏试玩列表 携带分享id





// AIA
export const getTransferInfo=(data)=>post(`https://admin3.dorathb.com/promotion/gw/transfer/info`,data)//获取中转信息地区等