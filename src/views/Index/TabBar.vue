<!-- <template>
    <ul class="tab-bar">
        <li v-for="item in list" class="tab-bar-item" 
        :class="{active:active==item.name}" 
        @click="change(item)">
        {{ item.label }}
        </li>
    </ul>
</template>
<script setup>
import {ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'
const router=useRouter()
const route=useRoute()
const props = defineProps({
    list: { type: Array }
})
const emits=defineEmits(['change'])
const change=(item)=>{
    active.value=item.name
    emits('change',item)
    router.push({name:item.name})
}
const active=defineModel('modelValue')
// const TabBarList = reactive([
//   { label: '赛事', name: 'Match' },
//   { label: '开奖', name: 'Draw' },
//   { label: '体育', name: 'Sports' },
//   { label: '分析', name: 'Analysis' },
// ])
</script>
<style lang="scss" scoped>
.tab-bar {
    display: flex;
    font-size: 16px;
    .tab-bar-item {
        text-align: center;
        border: 1px solid #000;
        flex: 1;
        line-height: 40px;
        border-radius: 4px;
        background-color: #fff;
    }
    .active{
        background-color: rgb(221, 117, 43);
        color: #fff;
    }
}
</style>   -->