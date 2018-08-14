<template lang="pug">
ActivateLicenceBaseStep.ActivateLicenceOwner(
  :title="$t('title.ownerInfos')",
  :button="$t('button.create')"
  @next='next'
  :pending='pending' )
  .layout
    DragDropZone( @drag='onImageDragged' )
    input( v-model='name' :placeholder="$t('placeholder.fullName')" autofocus )
    input(
      v-model='email'
      :placeholder="$t('placeholder.email')"
      @keyup.enter="next" )
  span.message.error( v-show='hasError' )
    | {{ error.title }},&nbsp;
    el-tooltip
      div( slot='content' v-html="error.description" )
      span.learn-more {{ $t('learnMore') }}.
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'
import DragDropZone from './DragDropZone'
import * as helpers from '@/utils/string-helpers'
import delay from '@/utils/delay'
import { validate } from '@/validators'
import { i18n } from '@/i18n/'

export default {
  components: {
    ActivateLicenceBaseStep,
    DragDropZone
  },

  data () {
    return {
      name: '',
      email: '',
      picture: '',
      error: {
        title: '',
        description: ''
      },
      pending: false
    }
  },

  computed: {
    hasError () {
      return !!this.error.title && !!this.error.description
    }
  },

  created () {
    this.$store.set('ui/licence/currentStep', 3)
  },

  methods: {
    cleanError () {
      this.error.title = ''
      this.error.description = ''
    },

    showErrors (errors) {
      // We must choose between a title for a specific field or a generic title
      this.error.title = errors.length === 1
        ? errors[0].title
        : this.$t('alert.invalidFields')

      // Stack each description below each other
      this.error.description = errors
        .map(e => e.description)
        .join('<br>')
    },

    onImageDragged (e) {
      this.picture = e.image
    },

    async next () {
      this.cleanError()
      this.name = helpers.cleanWhitespaces(this.name)
      const errors = validate({
        fullName: this.name,
        email: this.email
      })
      if (errors.length > 0) {
        return this.showErrors(errors)
      }

      await this.activateLicence()
        ? this.completeStep()
        : alert('Activation failed... contact support please.')
    },

    /** @returns {Promise<Boolean>} */
    async activateLicence () {
      this.pending = true
      const owner = {
        firstname: this.name.split(' ')[0],
        lastname: this.name.split(' ')[1],
        email: this.email,
        picture: this.picture,
        language: i18n.locale
      }

      const request = this.$store.dispatch('ui/licence/activate', owner)

      // We must wait at least 1000 milliseconds for the change
      // of state of the button so that it is not too fast (abrupt).
      await delay(1000)

      const response = await request
      this.pending = false
      return response.status === 200
    },

    completeStep () {
      const step = this.$route.meta.step
      this.$store.set('ui/licence/owner', {
        name: this.name,
        email: this.email
      })
      this.$store.dispatch('ui/licence/completeStep', { step })
      this.$router.push({ name: 'activateLicenceCompleted' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/activate-licence.scss';

.ActivateLicenceOwner > .layout {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-gap: 2rem;
  justify-content: center;
  align-items: center;

  > .DragDropZone {
    grid-area: 1 / 1 / 3 / 2;
  }
}

input {
  text-align: center;
  min-width: 18em;
}
</style>
