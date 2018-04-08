<template>
  <label class="image-input">
    <span class="image-input_filename"
          v-if="filename">{{filename}}</span>
    <span class="image-input_filename placeholder"
          v-else>未选择文件……</span>
    <input class="image-input_widget"
           type="file"
           accept=".jpg, .jpeg, .png, .bmp, .svg"
           @change="onChange"
           ref="widget" />
    <span class="image-input_button">选择文件</span>
  </label>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Emit,
  Inject,
  Model,
  Provide,
  Watch,
} from 'vue-property-decorator';

/**
 * Component: image input
 */
@Component
export default class ImageInput extends Vue {
  private filename: string = '';

  private widget: HTMLInputElement;

  @Model('change') public dataUrl: string;

  private onChange(): void {
    if (this.widget.files !== null && this.widget.files.length === 1) {
      this.filename = this.widget.files[0].name;
      this.$emit('change', window.URL.createObjectURL(this.widget.files[0]));
    }
  }

  private mounted(): void {
    this.widget = <HTMLInputElement>this.$refs.widget;
  }
}
</script>