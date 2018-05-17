import BaseImage from '@/components/base/BaseImage'
import BaseModal from '@/components/base/BaseModal'
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'

export default class {
  static install (vue) {
    vue.component(BaseImage.name, BaseImage)
    vue.component(BaseModal.name, BaseModal)
    vue.component(BaseLanguageSwitch.name, BaseLanguageSwitch)
  }
}
