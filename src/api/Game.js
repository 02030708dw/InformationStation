import request from '../util/request'


// 赛事分页列表
export function GameData ({date}) {
    return request({
        url:'/materialGame/getLiveSportList',
        method: "get",
        params: {date}
    })
}


// 获取赛事详情
export function GameDataInfo ({id}) {
    return request({
        url:`/materialGame/getDetail/${id}`,
        method: "get",
        // params: {pageNo,pageSize}
    })
}
