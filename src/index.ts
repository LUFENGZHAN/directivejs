import { App } from 'vue'
import debounce from './debounce'
import ellipsis from './ellipsis'
import sizeOb from './sizeOb'
export const directives = {
    debounce,
    ellipsis,
    sizeOb
    // 导入其他自定义指令
};
export default {
    install(app: App<Element>) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key] as any)
        })
    }
}
export interface CustomDirectiveBinding {
    value: any;
    arg: string;
    modifiers: {
        [key: string]: boolean;
    };
}