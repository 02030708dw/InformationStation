import {defineStore} from 'pinia'
const useUserInfo = defineStore('UserInfo',{
    state:() => ({
        userinfo:{}
    }),
    actions:{
        uptauserinfo (data) {
            this.userinfo = data
        }
    },
    getters:{},
    persist:{
        key:'UserInfo',
        storage: localStorage, 
        paths: ['userinfo'], 
    }
})

export default useUserInfo