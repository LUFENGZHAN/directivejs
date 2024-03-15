import { CustomDirectiveBinding } from './index'
export default {
    mounted(el: any, binding: CustomDirectiveBinding) {
        const webkitLineClamp = typeof Number(binding.value) === 'number' && Number(binding.value) || 1
        el.style.display = "-webkit-box";
        el.style.webkitLineClamp = webkitLineClamp;
        el.style.webkitBoxOrient = "vertical";
        el.style.maxWidth = "100%";
        el.style.height = "auto";
        el.style.lineHeight = "1.4";
        el.style.overflow = "hidden";
        el.style.textOverflow = "ellipsis";
        el.style.wordWrap = 'break-word';
        el.style.wordBreak = "break-all";
    }
}