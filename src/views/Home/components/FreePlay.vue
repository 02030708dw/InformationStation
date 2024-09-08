<template>
    <div class="free-play">
        <Title text="Free Play" />
        <ul class="play">
            <li class="play-item" v-for="item in 3">
                <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msP5m.img">
            </li>
        </ul>
    </div>
</template>
<script setup>
import Title from './Title.vue';
</script>
<style lang="scss">
.free-play {
    background-color: $themebgColor;
    color: #fff;
    border-radius: 7px;
    padding: 5px;
    .play {
        display: flex;
        gap: 10px;

        .play-item {
            border-radius:8px;
            overflow: hidden;
            border: 1px solid #BDCBFF;
            width: 108px;
            height: 78px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>