export default {
    mounted(el: Element, binding: any) {
        let timer: any;
        const time = el.getAttribute('debounce-time') || 500 
        if (typeof binding.value !== 'function') return
        el.addEventListener('click', (e) => {
            console.log(binding);
            clearTimeout(timer)
            timer = setTimeout(() => {
            }, Number(time))
        })
    },
    unmounted(el: Element, binding: any) {
        el.removeEventListener('click', binding.value)
    },
}