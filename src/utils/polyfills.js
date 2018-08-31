/**
 * A polyfill is a piece of code (usually JavaScript on the Web) used to
 * provide modern functionality on older browsers that do not natively
 * support it.
 *
 * For example a polyfill could be used to mimic the functionality of an
 * HTML Canvas element on Microsoft Internet Explorer 7 using a Silverlight
 * plugin, or mimic support for CSS rem units, or text-shadow, or whatever
 * you want.
 */

/**
 * A Promise is a proxy for a value not necessarily known when the promise
 * is created. It allows you to associate handlers with an asynchronous
 * action's eventual success value or failure reason. This lets asynchronous
 * methods return values like synchronous methods: instead of immediately
 * returning the final value, the asynchronous method returns a promise to
 * supply the value at some point in the future.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */
window.Promise = window.Promise ||
  require('bluebird')

/**
 * Resize Observer is a new JavaScript API that’s very similar to other
 * observer APIs like the Intersection Observer API. It allows for elements
 * to be notified when their size changes.
 * https://alligator.io/js/resize-observer/
 *
 * It's recommended to use this library in the form of a ponyfill, which
 * doesn't inflict modifications of the global object.
 *
 * window.ResizeObserver = window.ResizeObserver ||
 *    require('resize-observer-polyfill')
 */

console.log('💡')
