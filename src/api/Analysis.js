import request from '../util/request'

// 赛事分页列表
export function AnalysisData ({date}) {
    return request({
        url:'/assay/getAssayList',
        method: "get",
        params: {date}
    })
}

// 赛事分析详情
export function AnalysisInfo ({id}) {
    return request({
        url:`/assay/getSportNew/${id}`,
        method: "get",
    })
}