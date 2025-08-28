<template>
  <div class="animation-container">
    <img :src="currentFrameUrl" :width="size[0]" :height="size[1]" class="frame-display" alt="Animation Frame">
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  size: [number, number];
}>();

const basePath = '/frames/lubanani-';
const totalFrames = 30;
const fileExtension = '.png';
const fps = 15; // 播放速度（帧/秒）

const currentFrameIndex = ref(0);
let animationInterval: number | null = null;

// 生成当前帧的完整URL
const currentFrameUrl = computed(() => {
  // 格式化帧序号为4位数（01, 02等）
  const frameNumber = (currentFrameIndex.value + 1).toString().padStart(2, '0');
  return `${basePath}${frameNumber}${fileExtension}`;
});

// 启动动画播放
const startAnimation = () => {
  const intervalMs = 1000 / fps;
  
  animationInterval = window.setInterval(() => {
    currentFrameIndex.value = (currentFrameIndex.value + 1) % totalFrames;
  }, intervalMs);
};

// 停止动画播放
const stopAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
};

// 组件挂载时启动动画
onMounted(() => {
  startAnimation();
});

// 组件卸载时停止动画
onUnmounted(() => {
  stopAnimation();
});
</script>

<style lang="less" scoped>
.animation-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.frame-display {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
