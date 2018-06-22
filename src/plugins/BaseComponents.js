import BaseCard from '@/components/base/BaseCard'
import BaseIcon from '@/components/base/BaseIcon'
import BaseImage from '@/components/base/BaseImage'
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'

export default class {
  static install (vue) {
    vue.component(BaseCard.name, BaseCard)
    vue.component(BaseIcon.name, BaseIcon)
    vue.component(BaseImage.name, BaseImage)
    vue.component(BaseLanguageSwitch.name, BaseLanguageSwitch)
  }
}
