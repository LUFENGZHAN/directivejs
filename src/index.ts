import { App } from 'vue'
import debounce from './debounce'
import ellipsis from './ellipsis'
import sizeOb from './sizeOb'
import writing from './writing'
export const directives = {
    debounce,
    ellipsis,
    sizeOb,
    writing
};
export default {
    install(app: App<Element>) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}
export interface CustomDirectiveBinding {
    value?: any;
    arg?: string;
    modifiers?: {
        [key: string]: boolean;
    };
}