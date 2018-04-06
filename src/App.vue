<template>
  <div id="app"
       class="rb-app">
    <div class="rb-app_title">
      游戏评分板
    </div>

    <div class="rb-section">
      <rb-review-board ref="source"
                       :title="title"
                       :intro="intro"
                       :pros="pros"
                       :cons="cons"></rb-review-board>
    </div>

    <div class="rb-section">
      <div class="rb-container">
        <button class="rb-button"
                @click="build">生成</button>
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

/**
 * App
 */
@Component({
  components: {
    RbReviewBoard,
  },
})
export default class App extends Vue {
  public cover: string = '';
  public title: string = '《帝国时代：决定版》';
  public intro: string = '虽然“原汁原味”，却有些“忆苦思甜”';
  public pros: string[] = [
    '画面4K体验',
    '原汁原味的初代游戏内容',
    '用心修订过的细节和战役',
    '全程语音和音乐重置',
  ];
  public cons: string[] = ['寻路机制问题突出', 'AI反馈令人失望', 'Bug依然较多'];

  public canvasDisplay: 'show' | 'hidden' = 'hidden';
  public image: string = '';

  public build(): void {
    html2canvas((<Vue>this.$refs.source).$el, { background: undefined }).then(canvas => {
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
