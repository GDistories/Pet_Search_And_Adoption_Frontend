// 预期需求：
// Confirm({ title: '标题', text: '您确定从购物车删除选中的商品吗？' }).then(() => {
//   store.dispatch('cart/batchDeleteCart')
// }).catch(e => {})
import { createVNode, render } from 'vue';
import VConfirm from '~/components/VConfirm.vue';

// 准备div容器
const divNode = createVNode('div', { class: 'v-confirm-container' });
render(divNode, document.body);
// 获取 DOM 节点, 用于挂载组件或卸载组件
const container = divNode.el;

// 导出函数可通过调用 Confirm() 函数动态创建 XtxConfirm 组件
const Confirm = ({ title, text }) => {
	// 返回 Promise 对象
	return new Promise((resolve, reject) => {
		// 2. 点击确认按钮，触发resolve同时销毁组件
		const confirmCallback = () => {
			render(null, container);
			resolve('点击确认');
		};
		// 3. 点击取消按钮，触发reject同时销毁组件
		const cancelCallback = () => {
			render(null, container);
			reject(new Error('点击取消'));
		};
		// 1. 创建 XtxConfirm 组件
		const VNode = createVNode(VConfirm, { title, text, confirmCallback, cancelCallback });
		render(VNode, container);
	});
};
export default Confirm;
