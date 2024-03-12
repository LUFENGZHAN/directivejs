import { App } from 'vue'
import debounce from './debounce'
export default {
    install(app: App<Element>) {
        app.directive('debounce',debounce)
    }
}