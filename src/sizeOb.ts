import {CustomDirectiveBinding} from './index'

let map = new WeakMap()
let ob = new ResizeObserver(entries => {
   for(const entry of entries){
    const hand = map.get(entry.target)
    hand && hand({
      width:entry.borderBoxSize[0].inlineSize,
      height:entry.borderBoxSize[0].blockSize
    })
   }
})
export default {
    mounted(el: Element, binding: CustomDirectiveBinding) {
        map.set(el, binding.value)
        ob.observe(el)
    },
    unmounted(el: Element, binding: CustomDirectiveBinding) {
        ob.unobserve(el)
    },
}