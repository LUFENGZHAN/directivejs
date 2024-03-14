import {CustomDirectiveBinding} from './index'

let map = new WeakMap()
let ob = new ResizeObserver(entries => {
    
})
export default {
    mounted(el: Element, binding: CustomDirectiveBinding) {
        console.log(el);
        ob.observe(el)
    },
    unmounted(el: Element, binding: CustomDirectiveBinding) {
        ob.unobserve(el)
    },
}