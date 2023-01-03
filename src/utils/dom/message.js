// 实现使用函数调用xtx-message组件的逻辑
//   引入 创建虚拟节点 和渲染方法
import { createVNode, render } from 'vue';
// 引入信息提示组件
import VMessage from '~/components/VMessage.vue';

// 准备dom容器
const div = document.createElement('div');
// 添加类名
div.setAttribute('class', 'vmessage-container');
// 添加到body上
document.body.appendChild(div);

// 定时器标识
let timer = null;

export default ({ type, text }) => {
	const vnode = createVNode(VMessage, { type, text });
	render(vnode, div);
	clearTimeout(timer);
	timer = setTimeout(() => {
		render(null, div);
	}, 3000);
};
