import {defineStore} from 'pinia'

const useInformationinfo = defineStore('Informationinfo',{
    state:()=>({
        Informationinfo:{}
    }),
    actions:{
         UpdataInformationinfo(data) {
            this.Informationinfo = data
        }
    },
    getters:{},
    persist: {
        key: 'Informationinfo', 
        storage: localStorage, 
        paths: ['Informationinfo'], 
    }
})

export default useInformationinfo