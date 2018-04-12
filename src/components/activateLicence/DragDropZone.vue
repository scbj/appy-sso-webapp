<template lang="pug">
.drag-drop-zone(
  :class='{ highlight: isDragging || hasImage }'
  @dragenter='onDrag'
  @dragover='onDragOver'
  @dragleave='onDragLeave'
  @drop='onDrop' )
  span.label {{ $t('message.dragAndDropHere') }}
  input( ref='fileExplorerInput' type='file' class='file-explorer' accept='image/*' @change='onFileSelected' )
  BaseImage.preview( v-if='hasImage' :src='preview' draggable='false' )
  button.open-remove-button( @click='onClick'  )
    i( v-show='hasImage' class='icon ion-ios-trash' )
</template>

<script>
import BaseImage from '../base/BaseImage'

function handleEvent (e) {
  e.stopPropagation()
  e.preventDefault()
}

export default {
  components: {
    BaseImage
  },

  data () {
    return {
      preview: '',
      isDragging: false
    }
  },

  computed: {
    hasImage () {
      return !!this.preview
    }
  },

  methods: {
    /** Stop popagation and prevent default. */
    onDrag: e => handleEvent(e),

    onDragOver (e) {
      handleEvent(e)
      this.isDragging = true
    },

    onDragLeave (e) {
      handleEvent(e)
      this.isDragging = false
    },

    onDrop (e) {
      handleEvent(e)
      const transfer = e.dataTransfer
      this.handleFiles(transfer.files)
      this.isDragging = false
    },

    onClick () {
      if (this.preview) {
        // Reset the preview and allow drag and drop again
        this.preview = ''
      } else {
        // Simulate a click on the input file
        const input = this.$refs.fileExplorerInput
        input && input.click()
      }
    },

    onFileSelected () {
      const input = this.$refs.fileExplorerInput
      this.handleFiles(input.files)
    },

    handleFiles (files) {
      const containsFile = files && !!files.length
      if (!containsFile) {
        return console.debug("'files' doesn't contains file.")
      }
      const file = files[0]
      if (file.type.startsWith('image/')) {
        this.preview = window.URL.createObjectURL(file)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-drop-zone {
  $color: #c3bbc1;
  color: $color;
  position: relative;
  display: grid;
  grid-template: 1fr / 1fr;
  width: 12rem;
  height: 12rem;
  border: 3px dashed $color;
  border-radius: 5px;
  padding: 1rem;

  &.highlight {
    $color: #9E3AA6;
    border-color: $color;
    color: $color;
  }

  > .preview,
  > .open-remove-button {
    width: 100%;
    height: 100%;
    grid-area: 1 / 1 / 2 / 2;
  }

  > .label {
    pointer-events: none;
    user-select: none;
    grid-area: 1 / 1 / 2 / 2;
    align-self: center;
    font-size: 1.65rem;
    text-align: center;
    line-height: 2rem;
  }

  > .preview {
    pointer-events: none;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 3px 10px -2px rgba(black, .6);
  }
  > .open-remove-button {
    cursor: pointer;
    display : flex;
    align-items: center;
    justify-content: center;

    &:hover i {
      opacity: 1;
      transition: none;
    }

    > i {
      pointer-events: none;
      opacity: 0;
      color: white;
      font-size: 3rem;
      transition: opacity .2s ease-in-out;
    }
  }
  > .file-explorer { display: none; }
}

</style>
