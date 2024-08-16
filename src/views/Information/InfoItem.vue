<template>
    <div class="InforItem">
        <div class="head">
            <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msyOb.img">
            <div class="user">
                <p class="account">{{ data.account }}</p>
                <p class="time">{{ data.updatedAt }}</p>
            </div>
        </div>
        <div class="text">
            {{ data.title }}
        </div>
    </div>
</template>
<script setup>
import { showImagePreview } from 'vant'
const props = defineProps(['data'])
</script>
<style scoped lang="scss">
.InforItem {
    padding: 10px;
    background-color: #fff;

    .head {
        height: 50px;
        display: flex;
        gap: 10px;

        img {
            border-radius: 50px;
            width: 50px;
            height: 50px;
        }

        .user {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            .account {
                font-size: 20px;

            }

            .time {}
        }
    }
    .text{
        margin-top: 10px;
    }
}
</style>