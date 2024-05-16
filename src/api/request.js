import {get,post} from './index.js'

export const getUserInfo=(memberId)=>get(`/kioskSetting/getInfo/${memberId}`)//获取会员信息

export const getGameGodList=()=>get(`/material/collect/account/dropdownBox/client`)//获取大神列表

export const getGameGodArticle=(data)=>post(`/material/collect/new/client/page`,data)//获取单个大神文章