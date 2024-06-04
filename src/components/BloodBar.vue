<template>
  <div class="blood-bar" :style="{ width: '100%', height: '20px', backgroundColor: '#e0e0e0' }">
    <div class="blood-bar-inner"
         :style="{ width: `${bloodPercentage}%`, height: '100%', backgroundColor: bloodColor }">
    </div>
    <span class="blood-bar-text">{{ bloodPercentage.toFixed(0) }}%</span>
  </div>
</template>

<script>
export default {
  name: 'BloodBar',
  props: {
    value: {
      type: Number,
      default: 100,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    color: {
      type: String,
      default: 'red', // 血条颜色
    }
  },
  computed: {
    bloodPercentage() {
      return (this.value / this.maxValue) * 100;
    },
    bloodColor() {
      // 可以根据当前血量值变化血条颜色
      return this.color;
    }
  }
};
</script>

<style scoped>
.blood-bar {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.blood-bar-inner {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
  transition: width 0.5s ease;
}
.blood-bar-text {
  position: absolute;
  color: #3f3e3e;
  font-weight: bold;
  z-index: 1;
  pointer-events: none; /* Ensures the text is not interactable */
}
</style>
