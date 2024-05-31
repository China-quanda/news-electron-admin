// 导入阿里图标库
import '@/assets/fonts/iconfont.css'
import '@/assets/iconfont/iconfont.js';

import button from './my-button/my-button.vue'
import icon from './my-icon/my-icon.vue'
import card from './my-card/my-card.vue'
import Overlay from './Overlay/index.vue'
import Dialog from './Dialog/index.vue'
import Iframe from './Iframe/index.vue'
import Popup from './Popup/index.vue'

export default {
  install(app:any){
    app.component('my-icon', icon)
    app.component('my-button', button)
    app.component('my-card', card)
    app.component('my-overlay', Overlay)
    app.component('my-dialog', Dialog)
    app.component('my-iframe', Iframe)
    app.component('my-popup', Popup)
  }
}