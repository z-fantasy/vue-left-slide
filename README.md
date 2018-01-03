# vue-left-slide

> A Vue.js left slide component

## Use

``` bash
# install dependencies
npm install vue-left-slide

# configuration in main.js
import LeftSlide from 'vue-left-slide'
Vue.use(LeftSlide)

# in template
<lefts-slides
 :handleGray="'edit'"
 :handleRed="'delete'"
 :distanceWidth="120"
 :index="12",
 :itemData="JSON Object"
 @deleteItem="deleteFunction($event)"
 @editItem="editFunction($event)"
>
  <div>your html construction and html style</div>
</lefts-slides>

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
"# vue-left-slide"
