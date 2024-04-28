import { CustomDirectiveBinding } from './index';

let isDrawing = false;
// 鼠标按下
let left: number, top: number;
let X: number = 0,
	Y: number = 0;
const startDrawing = (e: MouseEvent | TouchEvent,el: HTMLElement) => {
	isDrawing = true;
    [X, Y] = [getTouchstart(e,el).X,getTouchstart(e,el).Y]
};
// 鼠标点击位置
const getTouchstart = (e: any,el: HTMLElement) => {
	return {
		X: Number(e.offsetX || (e.changedTouches && (e.changedTouches[0].clientX - el.offsetLeft))),
		Y: Number(e.offsetY || (e.changedTouches && (e.changedTouches[0].clientY - el.offsetTop))),
	};
};
// 鼠标移动位置
const getXY = (e: any) => {
	return {
		X: Number(e.clientX || (e.changedTouches && e.changedTouches[0].clientX)),
		Y: Number(e.clientY || (e.changedTouches && e.changedTouches[0].clientY)),
	};
};
// 鼠标抬起
const draw = (e: any, el: HTMLElement) => {
	e.preventDefault();
	if (!isDrawing) return;
	[left, top] = [getXY(e).X, getXY(e).Y];
	el.style.left = left - X + 'px';
	el.style.top = top - Y + 'px';
};
// 鼠标离开
const endDrawing = (binding?: CustomDirectiveBinding) => {
	isDrawing = false;
    if (!binding?.value) return;
	if ( typeof binding?.value !== 'function') return console.warn('binding value must be a function');
	binding && binding.value({ top, left });
};
export default {
	mounted(el: HTMLElement, binding: CustomDirectiveBinding) {
		try {
			const styles = window.getComputedStyle(el);
			const cursor = styles.getPropertyValue('cursor');
			const zIndex = styles.getPropertyValue('z-index');
			el.style.position = 'fixed';
			el.style.cursor = cursor === 'auto' ? 'pointer' : cursor;
			el.style.zIndex = zIndex === 'auto' ? '999' : zIndex;
			el.addEventListener('mousedown', e => startDrawing(e,el));
			el.addEventListener('touchstart', e => startDrawing(e,el));
			window.addEventListener('mousemove', e => draw(e, el), { passive: false });
			window.addEventListener('touchmove', e => draw(e, el), { passive: false });
			window.addEventListener('mouseup', () => endDrawing(binding));
			window.addEventListener('mouseleave', () => endDrawing(binding));
			window.addEventListener('touchend', () => endDrawing(binding));
		} catch (error) {
			console.error(error);
		}
	},
	unmounted(el: HTMLElement) {
		el.removeEventListener('mousedown', e => startDrawing(e,el));
		el.removeEventListener('touchstart', e => startDrawing(e,el));
		window.removeEventListener('mousemove', e => draw(e, el));
		window.removeEventListener('touchmove', e => draw(e, el));
		window.removeEventListener('mouseup', () => endDrawing());
		window.removeEventListener('mouseleave', () => endDrawing());
		window.removeEventListener('touchend', () => endDrawing());
	},
};
