# vuejs-directive

> 记录vue自定义指令

### Initial

```js
npm install vuejs-directive
```
### 方法
| 指令 | 说明 | 备注 |
|---|---|---|
| debounce | 函数防抖 | 防抖时间默认为500ms|
| throttle | 函数节流 | 节流时间默认为500ms |
| ellipsis | 文本省略 | 行数默认为1 |
| sizeOb | 监听元素大小 | 返回宽高 |
<!-- | copy | 复制指令 | 复制内容到粘贴板 | -->
<!-- | drag | 拖拽指令 | 拖拽元素 | -->
<!-- | longpress | 长按指令 | 长按触发事件 | -->
<!-- | lazy | 懒加载指令 | 图片懒加载 | -->
<!-- | watermark | 水印指令 | 添加水印 | -->

##### 使用方法

```js
// main.ts中
// 全局
const app = createApp(App);
import directivejs from 'vuejs-directive';
app.use(directivejs)

// 单个
import {directives} from 'vuejs-directive'
app.directive('string',directives.debounce)
```

###### 函数防抖

```html
<div v-debounce="click"/>
<div v-debounce:[1]="click" debounce-time="1000"/>
// 可使用属性debounce-time更改,可通过[1]传递一个参数
const = click(Event,1):void
```

###### 文本省略

```html
<span v-ellipsis="2">测试</span>
```

###### 元素大小监听

```html
<div v-size-ob="api">测试测试</div>
```
