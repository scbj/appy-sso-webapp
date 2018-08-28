// TODO: A terme remplacer Element UI par des composants personnalisé spécialement pour le projet

import Vue from 'vue'
import en from 'element-ui/lib/locale/lang/en'
import fr from 'element-ui/lib/locale/lang/fr'
import locale from 'element-ui/lib/locale'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Loading,
  Option,
  Pagination,
  Select,
  Tabs,
  TabPane,
  Tag,
  Tooltip
} from 'element-ui'

locale.use(en)
locale.use(fr)

Vue.use(Alert)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Tooltip)
