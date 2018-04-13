<template lang="pug">
ActivateLicenceBaseStep.activate-licence-owner(
  :title="$t('title.ownerInfos')",
  :button="$t('button.create')"
  @next='next' )
  .layout
    DragDropZone
    input( v-model='name' :placeholder="$t('placeholder.fullName')" )
    input( v-model='email' :placeholder="$t('placeholder.email')" )
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'
import DragDropZone from './DragDropZone'

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
      hasError: false
    }
  },

  mounted () {
    this.name = this.$store.state.licence.owner.name
    this.email = this.$store.state.licence.owner.email
  },

  methods: {
    next () {
      // TODO: Validate the fields: whitespace, special characters...etc
      this.hasError =
        this.name.length < 7 &&
        this.email < 7
      if (this.hasError === false) {
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
