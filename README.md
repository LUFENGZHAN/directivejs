# vuejs-directive

> 记录vue自定义指令

### Initial

```js
npm install vuejs-directive
```

##### 使用方法

```js
// main.ts中
const app = createApp(App);
import directivejs from 'vuejs-directive';
app.use(directivejs)
```

###### 函数防抖

```template
<div v-debounce:[1]="click" debounce-time="1000"/>

// debounce-time默认500
// 可使用属性debounce-time更改,可通过[1]传递一个参数
const = click(Event,1):void

```

###### 文本省略

```template
<span v-ellipsis="2">测试</span>
默认值为1
```

###### 元素大小监听

```vue
<div v-size-ob="api">测试测试</div>
//返回元素的宽高
```
