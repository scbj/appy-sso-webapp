<template lang="pug">
.drag-drop-zone(
  :class='{ highlight: isDragging }'
  @dragenter='onDrag'
  @dragover='onDragOver'
  @dragleave='onDragLeave'
  @drop='onDrop'
)
  span.label( v-show='!hasImage' ) {{ $t('message.dragAndDropHere') }}
  input(
    ref='fileExplorerInput'
    type='file'
    class='file-explorer'
    accept='image/*'
    @change='onFileSelected'
  )
  BaseImage.preview(
    v-if='hasImage'
    :src='preview'
    draggable='false'
  )
  button.open-remove-button( @click='onClick' :class="{ 'has-image': hasImage }"  )
    i( v-show='hasImage' class='icon ion-ios-trash-outline' )
</template>

<script>
/** Stop popagation and prevent default. */
function handleEvent (e) {
  e.stopPropagation()
  e.preventDefault()
}

export default {
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
  border: 3px dashed $color;
  border-radius: 5px;
  display: grid;
  grid-template: 1fr / 1fr;
  padding: 1rem;
  position: relative;
  width: 12rem;
  height: 12rem;

  &.highlight {
    $color: #9E3AA6;
    color: $color;
    border-color: $color;
  }

  > .preview,
  > .open-remove-button {
    border-radius: 5px;
    grid-area: 1 / 1 / 2 / 2;
    width: 100%;
    height: 100%;
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
    box-shadow: 0 3px 10px -2px rgba(black, .6);
  }

  > .open-remove-button {
    cursor: pointer;
    background-color: transparent;
    display : flex;
    align-items: center;
    justify-content: center;
    transition: background-color .2s ease-in-out;

    &.has-image:hover {
      background-color: rgba(black, .2);
      transition: none;

      i {
        opacity: 1;
        transition: none;
      }
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
