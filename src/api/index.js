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

export const getGameDraw=()=>postG(`/aia/shortTicket`)//获取部分开奖号码

export const getLongDraw=()=>postG(`aia/longTicket`)//获取全部开奖号码

export const getPhAward=(data)=>getG(`/material/getAwardNum/ph?gameCode=${data.code}&gameId=${data.gameId}`)//获取菲律宾往期奖期信息
