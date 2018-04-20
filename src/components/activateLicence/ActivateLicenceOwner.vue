<template lang="pug">
ActivateLicenceBaseStep.activate-licence-owner(
  :title="$t('title.ownerInfos')",
  :button="$t('button.create')"
  @next='next' )
  .layout
    DragDropZone
    input( v-model='name' :placeholder="$t('placeholder.fullName')" )
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
import { validate } from '@/validators'

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
      }
    }
  },

  computed: {
    hasError () {
      return !!this.error.title && !!this.error.description
    }
  },

  mounted () {
    this.name = this.$store.state.licence.owner.name
    this.email = this.$store.state.licence.owner.email
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

    next () {
      this.cleanError()
      this.name = helpers.cleanWhitespaces(this.name)
      const errors = validate({
        fullName: this.name,
        email: this.email
      })
      if (errors.length > 0) {
        return this.showErrors(errors)
      }

      const step = this.$route.meta.step
      this.$store.dispatch('licence/updateOwner', {
        name: this.name,
        email: this.email
      })
      this.$store.dispatch('licence/completeStep', { step })
      this.$router.push({ name: 'activateCompleted' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/activate-licence.scss';

.activate-licence-owner > .layout {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-gap: 2rem;
  justify-content: center;
  align-items: center;

  > .drag-drop-zone {
    grid-area: 1 / 1 / 3 / 2;
  }
}

input {
  text-align: center;
  min-width: 18em;
}
</style>
