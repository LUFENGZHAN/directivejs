import {CustomDirectiveBinding} from './index'
export default {
    mounted(el: Element, binding?: CustomDirectiveBinding) {
        let timer: any;
        const time = el.getAttribute('debounce-time') || 500 
        if (typeof binding?.value !== 'function') return new ErrorEvent('binding value must be a function')
        el.addEventListener('click', (e) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                binding?.value(e as Event,binding?.arg as typeof binding.arg)
            }, Number(time))
        })
    },
    unmounted(el: Element, binding: CustomDirectiveBinding) {
        if (typeof binding.value !== 'function') return 
        el.removeEventListener('click', binding.value)
    },
}