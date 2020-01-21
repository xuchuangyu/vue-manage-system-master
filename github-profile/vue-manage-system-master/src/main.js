import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import jQuery from 'jquery';
import VueFroala from 'vue-froala-wysiwyg'
　　//引入 Froala Editor js file.
　　require('froala-editor/js/froala_editor.pkgd.min')
　　//引入中文语言包
　　require('froala-editor/js/languages/zh_cn')
　　//引入 Froala Editor css files.
　　require('froala-editor/css/froala_editor.pkgd.min.css')
　　require('font-awesome/css/font-awesome.css')
　　require('froala-editor/css/froala_style.min.css')
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import common from './utils/common.js'
import 'babel-polyfill';
window.$=jQuery
Vue.use(VueFroala)
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
Vue.prototype.$common=common

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = JSON.parse(localStorage.getItem('ms_username'));
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
   //     role === 'admin' ? next() : next('/403');
         next()
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
