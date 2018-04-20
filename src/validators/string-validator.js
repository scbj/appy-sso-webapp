export default class StringValidator {
  constructor (value) {
    this.value = value || ''
    this.result = true
  }

  /** Allow only letters and whitespaces. */
  alphabetic () {
    this.result = this.result && /^[A-Za-zÀ-ÿ ]+$/.test(this.value)
    return this
  }

  min (value) {
    this.result = this.result && this.value.length >= value
    return this
  }

  max (value) {
    this.result = this.result && this.value.length <= value
    return this
  }
}
