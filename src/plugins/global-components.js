import Vue from 'vue'

import BaseButton from '@/components/base/BaseButton'
import BaseCard from '@/components/base/BaseCard'
import BaseDate from '@/components/base/BaseDate'
import BaseIcon from '@/components/base/BaseIcon'
import BaseIconButton from '@/components/base/BaseIconButton'
import BaseImage from '@/components/base/BaseImage'
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'

class GlobalComponents {
  static install (vue) {
    vue.component(BaseButton.name, BaseButton)
    vue.component(BaseCard.name, BaseCard)
    vue.component(BaseDate.name, BaseDate)
    vue.component(BaseIcon.name, BaseIcon)
    vue.component(BaseIconButton.name, BaseIconButton)
    vue.component(BaseImage.name, BaseImage)
    vue.component(BaseLanguageSwitch.name, BaseLanguageSwitch)
  }
}

Vue.use(GlobalComponents)
