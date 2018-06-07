import BaseIcon from '@/components/base/BaseIcon'
import BaseImage from '@/components/base/BaseImage'
import BaseModal from '@/components/base/BaseModal'
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'

export default class {
  static install (vue) {
    vue.component(BaseIcon.name, BaseIcon)
    vue.component(BaseImage.name, BaseImage)
    vue.component(BaseLanguageSwitch.name, BaseLanguageSwitch)
    vue.component(BaseModal.name, BaseModal)
  }
}
