function init(el: HTMLCanvasElement) {
	const getWidth = parseFloat(el.getAttribute('width') || '1920');
	const getHeight = parseFloat(el.getAttribute('height') || '1080');
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	const width = viewportWidth / getWidth;
	const height = viewportHeight / getHeight;
	const scale = Math.min(width, height);
	const left = (viewportWidth - getWidth * scale) / 2;
	const top = (viewportHeight - getHeight * scale) / 2;
	el.style.width = `${getWidth}px`;
	el.style.height = `${getHeight}px`;
	el.style.transform = `translate(${left}px,${top}px) scale(${scale})`;
}
// 自适应指令
export default {
	mounted(el: HTMLCanvasElement) {
		el.style.transformOrigin = 'top left';
		document.body.style.overflow = 'hidden';
		document.body.style.margin = '0';
		document.body.style.padding = '0';
		init(el);
		window.addEventListener('resize', () => init(el));
	},
	unmounted(el: HTMLCanvasElement) {
		window.removeEventListener('resize', () => init(el));
	},
};
