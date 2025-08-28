<template>
  <div class="tabs-container">
    <div class="tabs-bar">
      <div v-for="(slide, index) in slides" :key="index" class="tabs-item" :class="{ active: currentIndex === index }"
        @click="switchTab(index)">
        {{ slide.name }}
      </div>
    </div>
    <div class="content-container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
      <div class="content-wrapper" :style="{ transform: `translateX(${offsetX}px)` }">
        <div v-for="(slide, index) in slides" :key="index" class="content-item">
          <Demonstrate v-if="slide.type === 3"/>
          <Office2 v-else-if="slide.type === 2"/>
          <Office v-else-if="slide.type === 1"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Demonstrate } from '../Demonstrate';
import { Office } from '../Office';
import { Office2 } from '../Office2';

const currentIndex = ref(0)
const slides = ref<any[]>([
  {
    name: '办公室',
    type: 1,
  },
  {
    name: '办公室',
    type: 2,
  },
  {
    name: '智控单元',
    type: 3,
  },
  
])

const offsetX = ref(0)
const startX = ref(0)
const isSwiping = ref(false)
const isAnimating = ref(false)

const switchTab = (index: any) => {
  if (isAnimating.value) return

  currentIndex.value = index
  offsetX.value = -index * window.innerWidth
  console.log(window.innerWidth)
}

// 触摸开始
const onTouchStart = (e: TouchEvent) => {
  if (isAnimating.value) return

  isSwiping.value = true
  startX.value = e.touches[0].clientX
}

// 触摸移动
const onTouchMove = (e: TouchEvent) => {
  if (!isSwiping.value || isAnimating.value) return

  const currentX = e.touches[0].clientX
  const diffX = currentX - startX.value

  // 限制滑动范围
  if (
    (currentIndex.value === 0 && diffX > 0) ||
    (currentIndex.value === slides.value.length - 1 && diffX < 0)
  ) {
    return
  }

  offsetX.value = -currentIndex.value * window.innerWidth + diffX
}

// 触摸结束
const onTouchEnd = (e: TouchEvent) => {
  if (!isSwiping.value || isAnimating.value) return

  isSwiping.value = false
  const endX = e.changedTouches[0].clientX
  const diffX = endX - startX.value
  const threshold = window.innerWidth * 0.2

  let newIndex = currentIndex.value

  if (Math.abs(diffX) > threshold) {
    if (diffX > 0 && currentIndex.value > 0) {
      newIndex = currentIndex.value - 1
    } else if (diffX < 0 && currentIndex.value < slides.value.length - 1) {
      newIndex = currentIndex.value + 1
    }
  }

  // 平滑切换到新标签
  animateToIndex(newIndex)
}

// 动画切换到指定索引
const animateToIndex = (index: any) => {
  if (isAnimating.value) return

  isAnimating.value = true
  currentIndex.value = index

  // 使用requestAnimationFrame优化动画
  const targetOffset = -index * window.innerWidth
  const startOffset = offsetX.value
  const startTime = performance.now()
  const duration = 300

  const animate = (time: any) => {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = easeOutCubic(progress)

    offsetX.value = startOffset + (targetOffset - startOffset) * easeProgress

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      offsetX.value = targetOffset
      isAnimating.value = false
    }
  }

  requestAnimationFrame(animate)
}

// 缓动函数
const easeOutCubic = (t: any) => {
  return 1 - Math.pow(1 - t, 3)
}
</script>

<style lang="less" scoped>
.tabs-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.tabs-bar {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  z-index: 100;
  background: rgba(0, 0, 0, 0.53);
  border-radius: 16px;
  height: 42px;
}

.tabs-item {
  padding: 10px 16px;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.25s ease;
  text-align: center;
  white-space: nowrap;
}

.tabs-item.active {
  background: radial-gradient(149% 100% at 50% 100%, #00ced1 0%, #6666ff 100%);
  color: #ffffff;
  font-weight: bold;
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.content-item {
  flex: 0 0 100%;
  height: 100%;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
