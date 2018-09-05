<template>
  <div
    :class="{
      BaseTextEditable_active: editableModeEnabled,
      BaseTextEditable_empty: empty
    }"
    class="BaseTextEditable"
    @click="onClick"
    @blur="disableEditableMode"
    @focusout="disableEditableMode">
    <el-input
      ref="input"
      v-model="inputValue"
      size="small"
      class="BaseTextEditable__input"
      type="text" />
    <span class="BaseTextEditable__text" v-text="value || placeholder" />
  </div>
</template>

<script>
export default {
  name: 'BaseTextEditable',

  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    }
  },

  data () {
    return {
      editableModeEnabled: false,
      inputValue: ''
    }
  },

  computed: {
    empty () {
      return !this.value
    }
  },

  methods: {
    onClick () {
      if (!this.editableModeEnabled) {
        this.inputValue = this.value
        this.editableModeEnabled = true
        this.$refs.input.focus()
      }
    },

    disableEditableMode () {
      this.editableModeEnabled = false
      if (this.value !== this.inputValue) {
        this.$emit('changed', this.inputValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseTextEditable {
  position: relative;
  min-width: 30rem;
}

.BaseTextEditable_active {
  .BaseTextEditable__input {
    visibility: visible
  }

  .BaseTextEditable__text {
    visibility: hidden
  }
}

.BaseTextEditable_empty .BaseTextEditable__text {
  opacity: .4;
  user-select: none;
  cursor: text;
}

.BaseTextEditable__input {
  position: absolute;
  width: 100%;
  left: 0;
  visibility: hidden
}
</style>
