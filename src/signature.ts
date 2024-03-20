import { CustomDirectiveBinding } from './index'
let is_function = true
let isDrawing = false;
let X = 0
let Y = 0
let timer: number | undefined = void 0
const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: 'image/png' });
}
export default {
    mounted(el: HTMLCanvasElement, binding?: CustomDirectiveBinding) {
        try {
            if (typeof binding?.value !== 'function') {
                console.warn('binding value must be a function');
                is_function = false;
            }
            if (el.tagName === 'CANVAS') {
                el.width = el.offsetWidth;
                el.height = el.offsetHeight;
                const ctx = el.getContext('2d') as any;

                function startDrawing(e: any) {
                    isDrawing = true;
                    [X, Y] = [e.offsetX, e.offsetY];
                }
                function draw(e: any) {
                    let EX = e.offsetX || e.changedTouches && e.changedTouches[0].clientX;
                    let EY = e.offsetY || e.changedTouches && e.changedTouches[0].clientY - 50;
                    if (!isDrawing) return;
                    ctx.strokeStyle = '#000000';
                    ctx.beginPath();
                    ctx.moveTo(X, Y);
                    ctx.lineTo(EX, EY);
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    EX = e.offsetX || e.changedTouches && e.changedTouches[0].clientX;
                    EY = e.offsetY || e.changedTouches && e.changedTouches[0].clientY - 50;
                    [X, Y] = [EX, EY];
                }

                function endDrawing() {
                    isDrawing = false;
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        const dataURL = el.toDataURL('image/png');
                        const blob = dataURLtoBlob(dataURL);
                        const file = new File([blob], 'image.png', { type: 'image/png' });
                        if (is_function && binding?.value) {
                            binding.value({
                                file,
                                url: dataURL,
                            });
                        }
                    }, 1000)
                }
                el.addEventListener('mousedown', startDrawing);
                el.addEventListener('mousemove', draw);
                el.addEventListener('mouseup', endDrawing);
                el.addEventListener('mouseleave', endDrawing);
                el.addEventListener('touchstart', startDrawing);
                el.addEventListener('touchmove', draw);
                el.addEventListener('touchend', endDrawing);
            }
        } catch (error) {
            console.error(error);
        }
    }
}