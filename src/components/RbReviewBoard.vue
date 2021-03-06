<template>
  <div class="rb-review-board">
    <div class="rb-review-board_inner">
      <div class="rb-review-board_cover-container">
        <div class="rb-review-board_cover-inner"
             ref="inner">
          <img class="rb-review-board_cover"
               :src="cover"
               ref="cover"
               :style="{width: coverWidth, height: coverHeight}">
        </div>
      </div>

      <div class="rb-review-board_header">
        <div class="rb-review-board_title">
          <span class="rb-review-board_title-content">{{title}}</span>
        </div>
        <div class="rb-review-board_intro">—— {{intro}}</div>
      </div>

      <div class="rb-review-board_traits-wrapper">
        <div class="rb-review-board_traits">
          <div class="rb-review-board_traits-item pros"
               v-for="(text, index) in pros"
               :key="index">
            <span class="rb-review-board_traits-item-icon">
              <img src="@/assets/icon-plus.png" />
            </span>
            <span class="rb-review-board_traits-item-content">{{text}}</span>
          </div>
        </div>

        <div class="rb-review-board_traits">
          <div class="rb-review-board_traits-item cons"
               v-for="(text, index) in cons"
               :key="index">
            <span class="rb-review-board_traits-item-icon">
              <img src="@/assets/icon-minus.png" />
            </span>
            <span class="rb-review-board_traits-item-content">{{text}}</span>
          </div>
        </div>
      </div>

      <div class="rb-review-board_score-badge">
        <img class="rb-review-board_score-badge-background"
             src="@/assets/score-badge.png"
             alt="">
        <div class="rb-review-board_score-total">
          <div class="rb-review-board_score-total-value">{{scoreTotal | scoreFix}}分</div>
          <div class="rb-review-board_score-total-label">{{scoreTotalLabel}}</div>
        </div>

        <div class="rb-review-board_score-wrapper">
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">画面：</span>
            <span class="rb-review-board_score-item-value">{{scoreGraphic | scoreFix}}</span>
          </div>
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">音效：</span>
            <span class="rb-review-board_score-item-value">{{scoreAudio | scoreFix}}</span>
          </div>
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">系统：</span>
            <span class="rb-review-board_score-item-value">{{scoreSystem | scoreFix}}</span>
          </div>
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">操作：</span>
            <span class="rb-review-board_score-item-value">{{scoreOperation | scoreFix}}</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

function scoreFix(value: number): string {
  if (value < 0) {
    return '0';
  }
  if (value < 10) {
    return value.toFixed(1);
  }

  return '10';
}

/**
 * Component: Review Board
 */
@Component({
  filters: {
    scoreFix,
  },
})
export default class RbReviewBoard extends Vue {
  public readonly baseUrl?: string = process.env.BASE_URL;

  @Prop({ type: String, default: 'contain' })
  public coverFit: 'contain' | 'cover';

  @Prop({ type: String })
  public cover: string;

  public coverWidth: string = '';
  public coverHeight: string = '';

  public getCoverWidth(image: HTMLImageElement): string {
    if (this.coverFit === 'contain') {
      if (
        image.naturalWidth / image.naturalHeight >
        this.innerElement.clientWidth / this.innerElement.clientHeight
      ) {
        return '100%';
      } else {
        return 'auto';
      }
    } else if (this.coverFit === 'cover') {
      if (
        image.naturalWidth / image.naturalHeight >
        this.innerElement.clientWidth / this.innerElement.clientHeight
      ) {
        return 'auto';
      } else {
        return '100%';
      }
    }

    return '';
  }

  public getCoverHeight(image: HTMLImageElement): string {
    if (this.coverFit === 'contain') {
      if (
        image.naturalWidth / image.naturalHeight >
        this.innerElement.clientWidth / this.innerElement.clientHeight
      ) {
        return 'auto';
      } else {
        return '100%';
      }
    } else if (this.coverFit === 'cover') {
      if (
        image.naturalWidth / image.naturalHeight >
        this.innerElement.clientWidth / this.innerElement.clientHeight
      ) {
        return '100%';
      } else {
        return 'auto';
      }
    }

    return '';
  }

  @Watch('cover')
  private onCoverChange(value: string): void {
    this.$nextTick(() => {
      const image: HTMLImageElement = window.document.createElement('img');
      image.src = value;
      this.coverWidth = this.getCoverWidth(image);
      this.coverHeight = this.getCoverHeight(image);
    });
  }

  @Watch('coverFit')
  private onCoverFitChange(): void {
    this.$nextTick(() => {
      this.coverWidth = this.getCoverWidth(this.coverElement);
      this.coverHeight = this.getCoverHeight(this.coverElement);
    });
  }

  @Prop({ type: String })
  public title: string;

  @Prop({ type: String })
  public intro: string;

  @Prop({ type: Array })
  public pros: string[];

  @Prop({ type: Array })
  public cons: string[];

  @Prop({ type: Number, default: 0 })
  public scoreTotal: number;

  @Prop({ type: String })
  public scoreTotalLabel: number;

  @Prop({ type: Number, default: 0 })
  public scoreGraphic: number;

  @Prop({ type: Number, default: 0 })
  public scoreAudio: number;

  @Prop({ type: Number, default: 0 })
  public scoreSystem: number;

  @Prop({ type: Number, default: 0 })
  public scoreOperation: number;

  private innerElement: HTMLDivElement;
  private coverElement: HTMLImageElement;

  private mounted(): void {
    this.innerElement = <HTMLDivElement>this.$refs.inner;
    this.coverElement = <HTMLImageElement>this.$refs.cover;
  }
}
</script>