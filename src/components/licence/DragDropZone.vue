<template lang="pug">
.DragDropZone(
  :class='{ highlight: isDragging }'
  @dragenter.stop.prevent='onDrag'
  @dragover.stop.prevent='onDragOver'
  @dragleave.stop.prevent='onDragLeave'
  @drop.stop.prevent='onDrop'
)
  span.DragDropZon__label( v-show='!hasImage' ) {{ $t('message.dragAndDropHere') }}
  input.DragDropZon__file-explorer(
    ref='fileExplorerInput'
    type='file'
    accept='image/*'
    @change='onFileSelected'
  )
  BaseImage.DragDropZon__preview(
    v-if='hasImage'
    :src='preview'
    draggable='false'
  )
  button.DragDropZon__open-remove-button( @click='onClick' :class="{ 'has-image': hasImage }"  )
    BaseIcon( v-show='hasImage' name='ios-trash' )
</template>

<script>
import { limitResolution } from '@/utils/image'

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
    onDragOver () {
      this.isDragging = true
    },

    onDragLeave () {
      this.isDragging = false
    },

    onDrop (e) {
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

    async handleFiles (files) {
      const containsFile = files && !!files.length
      if (!containsFile) {
        return console.debug("'files' doesn't contains file.")
      }
      const file = files[0]
      if (file.type.startsWith('image/')) {
        const image = await limitResolution(file, 200)
        if (image) {
          this.preview = image
          this.$emit('drag', { image })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.DragDropZone {
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

  > .DragDropZon__preview,
  > .DragDropZon__open-remove-button {
    border-radius: 5px;
    grid-area: 1 / 1 / 2 / 2;
    width: 100%;
    height: 100%;
  }

  > .DragDropZon__label {
    pointer-events: none;
    user-select: none;
    grid-area: 1 / 1 / 2 / 2;
    align-self: center;
    font-size: 1.65rem;
    text-align: center;
    line-height: 2rem;
  }

  > .DragDropZon__preview {
    pointer-events: none;
    object-fit: cover;
    box-shadow: 0 3px 10px -2px rgba(black, .6);
  }

  > .DragDropZon__open-remove-button {
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
  > .DragDropZon__file-explorer { display: none; }
}

</style>
