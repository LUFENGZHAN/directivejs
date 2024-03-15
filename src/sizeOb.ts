import { CustomDirectiveBinding } from './index'

let map = new WeakMap()
let ob = new ResizeObserver(entries => {
    for (const entry of entries) {
        const hand = map.get(entry.target)
        hand && hand({
            width: entry.borderBoxSize[0].inlineSize,
            height: entry.borderBoxSize[0].blockSize
        })
    }
})
export default {
    mounted(el: Element, binding: CustomDirectiveBinding) {
        if (typeof binding.value !== 'function' && Object.prototype.toString.call(binding.value) !== '[object Function]') return console.warn('binding value must be a function')
        map.set(el, binding.value)
        ob.observe(el)
    },
    unmounted(el: Element, binding: CustomDirectiveBinding) {
        ob.unobserve(el)
    },
}