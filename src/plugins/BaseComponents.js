import BaseButton from '@/components/base/BaseButton'
import BaseCard from '@/components/base/BaseCard'
import BaseIcon from '@/components/base/BaseIcon'
import BaseIconButton from '@/components/base/BaseIconButton'
import BaseImage from '@/components/base/BaseImage'
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'
import BaseDate from '@/components/base/BaseDate'

export default class {
  static install (vue) {
    vue.component(BaseButton.name, BaseButton)
    vue.component(BaseCard.name, BaseCard)
    vue.component(BaseIcon.name, BaseIcon)
    vue.component(BaseIconButton.name, BaseIconButton)
    vue.component(BaseImage.name, BaseImage)
    vue.component(BaseLanguageSwitch.name, BaseLanguageSwitch)
    vue.component(BaseDate.name, BaseDate)
  }
}
