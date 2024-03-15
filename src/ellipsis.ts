import { CustomDirectiveBinding } from './index'
export default {
    mounted(el: { style: any; }, binding?: CustomDirectiveBinding) {
        const webkitLineClamp = typeof Number(binding?.value) === 'number' && Number(binding?.value) || 1
        Object.assign(el?.style, {
            display: "-webkit-box",
            webkitLineClamp: webkitLineClamp,
            webkitBoxOrient: "vertical",
            maxWidth: "100%",
            height: "auto",
            lineHeight: "1.4",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            wordBreak: "break-all",
        });
    }
}