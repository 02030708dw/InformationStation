import {defineStore} from 'pinia'

const useAnalysisInfo = defineStore('AnalysisInfo',{
    state:()=>({
        AnalysisInfo:{}
    }),
    actions:{
         UpdataAnalysisInfo(data) {
            this.AnalysisInfo = data
        }
    },
    getters:{},
    persist: {
        key: 'AnalysisInfo', 
        storage: localStorage, 
        paths: ['AnalysisInfo'], 
    }
})

export default useAnalysisInfo