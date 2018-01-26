<template>
<div id="login">
  <span>{{ $t('hello') }}</span>
  <el-select v-model="locale" placeholder="Langue">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button>Button</el-button>
</div>
</template>

<i18n>
{
  "en": {
    "hello": "Welcome"
  },
  "fr": {
    "hello": "Bonjour"
  }
}
</i18n>

<script>
export default {
  name: 'TestIntertionalization',
  data () {
    return {
      locale: 'en',
      msg: 'Welcome to Your Vue.js App',
      options: [
        {
          value: 'en',
          label: 'English'
        }, {
          value: 'fr',
          label: 'Français'
        }
      ]
    }
  },
  watch: {
    locale (value) {
      console.log(value)
      this.$i18n.locale = value
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
