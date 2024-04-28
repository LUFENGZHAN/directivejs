import {CustomDirectiveBinding} from "./index";
let is_function = true;
let isDrawing = false;
let lineWidth: string | number, lineColor: any;
let X = 0,
    Y = 0;
let timer: number | undefined = void 0;
const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: "image/png"});
};
function startDrawing(e: any) {
    isDrawing = true;
    [X, Y] = [e.offsetX, e.offsetY];
}
function getXY(e: any, el: HTMLCanvasElement) {
    return {
        X: Number(e.offsetX || (e.changedTouches && (e.changedTouches[0].clientX - el.offsetLeft))),
        Y: Number(e.offsetY || (e.changedTouches && (e.changedTouches[0].clientY - el.offsetTop))),
    };
}
function draw(ctx: CanvasRenderingContext2D, e: any, el: HTMLCanvasElement) {
    e.preventDefault();
    if (!isDrawing) return;
    const { X: currentX, Y: currentY } = getXY(e, el);
    
    ctx.lineCap = "round";
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(currentX, currentY);
    ctx.lineWidth = Number(lineWidth);
    ctx.stroke();

    [X, Y] = [currentX, currentY];
}
function endDrawing(el: HTMLCanvasElement, ctx: CanvasRenderingContext2D, Fn?: Function) {
    isDrawing = false;
    clearTimeout(timer);
    timer = setTimeout(() => {
        const dataURL = el.toDataURL("image/png");
        const blob = dataURLtoBlob(dataURL);
        const file = new File([blob], "image.png", {type: "image/png"});
        if (is_function && Fn) {
            Fn(
                {
                    file,
                    url: dataURL,
                },
                () => {
                    ctx.clearRect(0, 0, el.width, el.height);
                }
            );
        }
    }, 1000);
}
export default {
    mounted(el: HTMLCanvasElement, binding?: CustomDirectiveBinding) {
        try {
            if (el.tagName !== "CANVAS") return console.warn("v-signature directive must be used on a canvas element");
            lineWidth = el.getAttribute("line-width") || 3;
            lineColor = el.getAttribute("line-color") || "#000000";
            if (typeof binding?.value !== "function") {
                console.warn("binding value must be a function");
                is_function = false;
            }
            el.width = el.offsetWidth;
            el.height = el.offsetHeight;
            const ctx: any = el.getContext("2d");
            el.addEventListener("mousedown", startDrawing);
            el.addEventListener("mousemove", (e) => draw(ctx, e, el),{ passive: false });
            el.addEventListener("mouseup", (e) => endDrawing(el, ctx, binding?.value));
            el.addEventListener("mouseleave", (e) => endDrawing(el, ctx, binding?.value));
            el.addEventListener("touchstart", startDrawing);
            el.addEventListener("touchmove", (e) => draw(ctx, e, el),{ passive: false });
            el.addEventListener("touchend", (e) => endDrawing(el, ctx, binding?.value));
        } catch (error) {
            console.error(error);
        }
    },
    unmounted(el: HTMLCanvasElement) {
        el.removeEventListener("mousedown", startDrawing);
        el.removeEventListener("mousemove", (e: any) => draw(e, e, el));
        el.removeEventListener("mouseup", (e: any) => endDrawing(el, e));
        el.removeEventListener("mouseleave", (e: any) => endDrawing(el, e));
        el.removeEventListener("touchstart", startDrawing);
        el.removeEventListener("touchmove", (e: any) => draw(e, e, el));
        el.removeEventListener("touchend", (e: any) => endDrawing(el, e));
    },
};
