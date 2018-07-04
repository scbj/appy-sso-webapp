import BaseCard from '@/components/base/BaseCard'
import BaseIcon from '@/components/base/BaseIcon'
import BaseImage from '@/components/base/BaseImage'
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'
import BaseDate from '@/components/base/BaseDate'

export default class {
  static install (vue) {
    vue.component(BaseCard.name, BaseCard)
    vue.component(BaseIcon.name, BaseIcon)
    vue.component(BaseImage.name, BaseImage)
    vue.component(BaseLanguageSwitch.name, BaseLanguageSwitch)
    vue.component(BaseDate.name, BaseDate)
  }
}
