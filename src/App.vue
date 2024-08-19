<template>
  <router-view></router-view>
</template>
<script setup>
const body = document.querySelector('#body')
const html = document.documentElement
function setFontSize() {
  var viewportWidth = window.innerWidth;
  var fontSize = viewportWidth / 10;
  document.documentElement.style.fontSize = fontSize + 'px';
}
function setStyle() {
  body.style.width = '375px'
  html.style.fontSize = '37.5px'
}
const judgeIsMobileDevice = () => /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
function handleResize() {
  if (judgeIsMobileDevice()) {
    body.style = ''
    setFontSize()
  } else {
    setStyle()
  }
}
window.addEventListener('resize', handleResize)
handleResize();
console.log('autoSize')
</script>