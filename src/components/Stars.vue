<template>
    <div class="star" v-for="i in 400" :key="i">
    </div>
</template>

<style lang="scss">
.star {
position: absolute;
width: 1px;
height: 1px;
border-radius: 1px;
background: #fff;
@for $i from 1 through 400 {
  &:nth-child(#{$i}) {
    $randomOpacity: (random(95 + 1) + 5 - 1) / 100;
    left: random(1000) / 10 * 1% - 1%;
    bottom: random(1000) / 10 * 1% - 1%;
    opacity: $randomOpacity;
    box-shadow: 0 0 6px 1px rgba(255, 255, 255, $randomOpacity);
  }
}
}
</style>