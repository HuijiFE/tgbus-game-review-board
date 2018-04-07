<template>
  <div id="app"
       class="rb-app">
    <div class="rb-app_title">
      游戏评分板
    </div>

    <div class="rb-section">
      <rb-review-board ref="source"
                       :cover="cover"
                       :title="title"
                       :intro="intro"
                       :pros="pros"
                       :cons="cons"
                       :scoreTotal="scoreTotal"
                       :scoreTotalLabel="scoreTotalLabel"
                       :scoreGraphic="scoreGraphic"
                       :scoreAudio="scoreAudio"
                       :scoreSystem="scoreSystem"
                       :scoreOperation="scoreOperation"></rb-review-board>
    </div>

    <div class="rb-section">
      <div class="rb-container">

        <div class="rb-form">

          <div class="rb-form-item">
            <span class="rb-form-item_label">封面</span>
            <image-input class="rb-form-item_widget file"
                         v-model="cover"></image-input>
          </div>

          <div class="rb-form-item">
            <span class="rb-form-item_label">标题</span>
            <input class="rb-form-item_widget text"
                   type="text"
                   v-model="title" />
          </div>

          <div class="rb-form-item">
            <span class="rb-form-item_label">评语</span>
            <input class="rb-form-item_widget text"
                   type="text"
                   v-model="intro" />
          </div>

          <div class="rb-form-item">
            <span class="rb-form-item_label">优点</span>
            <textarea class="rb-form-item_widget textarea"
                      rows="6"
                      v-model="prosSource" />
            <span class="rb-form-item_label">缺点</span>
            <textarea class="rb-form-item_widget textarea"
                      rows="6"
                      v-model="consSource" />
          </div>

          <div class="rb-form_separator"></div>

          <div class="rb-form-item">
            <span class="rb-form-item_label">总分</span>
            <input class="rb-form-item_widget number"
                   type="number"
                   step="0.1"
                   v-model="scoreTotal" />
            <span class="rb-form-item_label">评级</span>
            <input class="rb-form-item_widget text"
                   type="text"
                   v-model="scoreTotalLabel" />
          </div>
          <div class="rb-form-item">
            <span class="rb-form-item_label">画面</span>
            <input class="rb-form-item_widget number"
                   type="number"
                   step="0.1"
                   v-model="scoreGraphic" />
            <span class="rb-form-item_label">音效</span>
            <input class="rb-form-item_widget number"
                   type="number"
                   step="0.1"
                   v-model="scoreAudio" />
          </div>
          <div class="rb-form-item">
            <span class="rb-form-item_label">系统</span>
            <input class="rb-form-item_widget number"
                   type="number"
                   step="0.1"
                   v-model="scoreSystem" />
            <span class="rb-form-item_label">操作</span>
            <input class="rb-form-item_widget number"
                   type="number"
                   step="0.1"
                   v-model="scoreOperation" />
          </div>

        </div>


        <div class="rb-button-wrapper small">
          <button class="rb-button"
                  @click="build">生成</button>
        </div>
      </div>
    </div>

    <div class="rb-canvas"
         :class="canvasDisplay">
      <button class="rb-canvas_close-button"
              @click="close">×</button>
      <div class="rb-canvas_container">
        <img :src="image" />
      </div>
      <!-- <div class="rb-canvas_container"
           ref="canvasContainer"></div> -->
      <div class="rb-button-wrapper">
        <a class="rb-button">保存</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import html2canvas from 'html2canvas';
import RbReviewBoard from '@/components/RbReviewBoard.vue';
import ImageInput from '@/components/form/ImageInput.vue';

/**
 * App
 */
@Component({
  components: {
    RbReviewBoard,
    ImageInput,
  },
})
export default class App extends Vue {
  public cover: string = '';
  public title: string = '《帝国时代：决定版》';
  public intro: string = '虽然“原汁原味”，却有些“忆苦思甜”';

  public prosSource: string = [
    '画面4K体验',
    '原汁原味的初代游戏内容',
    '用心修订过的细节和战役',
    '全程语音和音乐重置',
  ].join('\n');
  public consSource: string = ['寻路机制问题突出', 'AI反馈令人失望', 'Bug依然较多'].join(
    '\n'
  );

  public get pros(): string[] {
    return this.prosSource.split(/[\r\n]+/).filter((s, i) => s && i < 6);
  }
  public get cons(): string[] {
    return this.consSource.split(/[\r\n]+/).filter((s, i) => s && i < 6);
  }

  public scoreTotal: number = 8.0;
  public scoreTotalLabel: string = '非玩不可';
  public scoreGraphic: number = 9.0;
  public scoreAudio: number = 8.5;
  public scoreSystem: number = 7.0;
  public scoreOperation: number = 7.0;

  public onCoverSelect() {
    const coverInput = <HTMLInputElement>this.$refs.coverInput;
    if (coverInput.files) {
      this.cover = window.URL.createObjectURL(coverInput.files[0]);
    }
  }

  public canvasDisplay: 'show' | 'hidden' = 'hidden';
  public image: string = '';

  public build(): void {
    html2canvas((<Vue>this.$refs.source).$el, <Html2Canvas.Html2CanvasOptions>{
      backgroundColor: 'transparent', // there are some different between version 0.5 and 1.0
    }).then(canvas => {
      this.image = canvas.toDataURL();
      this.canvasDisplay = 'show';
      // (<Element>this.$refs.canvasContainer).appendChild(canvas);
    });
  }

  public close(): void {
    this.canvasDisplay = 'hidden';
    this.image = '';
    // tslint:disable-next-line
    // (<Element>this.$refs.canvasContainer).innerHTML = '';
  }

  public save(): void {
    //
  }
}
</script>
