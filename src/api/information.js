import request from '../util/request'


// 资讯分页列表
export function InformationData ({pageNo,pageSize}) {
    return request({
        url:'/materialNew/getSportNewList',
        method: "get",
        params: {pageNo,pageSize}
    })
}

