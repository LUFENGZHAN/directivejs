# directivejs
> 记录平时常用小工具集合

### Initial 
```js
npm install pu-directivejs
```
##### 使用方法 
```js
// main.ts中
const app = createApp(App);
import directivejs from 'pu-directivejs';
app.use(directivejs)
```
###### 函数防抖

```template
<div v-debounce="save" debounce-time="500"/>
```