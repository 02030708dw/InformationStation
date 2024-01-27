import request from '../util/request'

export function UserInfoData ({memberId}) {
    return request({
        url:`/kioskSetting/getInfo/${memberId}`,
        method: "get",
    })
}