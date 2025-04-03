import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import svgIcon from './icons/svgIcon.vue'

import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import naive from 'naive-ui'

import 'uplot/dist/uPlot.min.css'


createApp(App).use(Antd).use(router).use(naive).component('svg-icon', svgIcon).mount('#app')
