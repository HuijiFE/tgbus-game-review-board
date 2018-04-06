<template>
  <div class="rb-review-board">
    <div class="rb-review-board_inner">
      <div class="rb-review-board_cover-container">
        <img v-if="cover"
             class="rb-review-board_cover"
             :class="coverFit"
             :src="cover">
        <img v-else
             class="rb-review-board_cover"
             :class="coverFit"
             src="@/assets/game-cover.png" />
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
        <div class="rb-review-board_score-total">
          <div class="rb-review-board_score-total-value">{{scoreTotal | scoreFix}}分</div>
          <div class="rb-review-board_score-total-label">非玩不可</div>
        </div>

        <div class="rb-review-board_score-wrapper">
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">画面：</span>
            <span class="rb-review-board_score-item-value">{{scoreTotal | scoreFix}}</span>
          </div>
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">音效：</span>
            <span class="rb-review-board_score-item-value">{{scoreTotal | scoreFix}}</span>
          </div>
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">系统：</span>
            <span class="rb-review-board_score-item-value">{{scoreTotal | scoreFix}}</span>
          </div>
          <div class="rb-review-board_score-item">
            <span class="rb-review-board_score-item-label">操作：</span>
            <span class="rb-review-board_score-item-value">{{scoreTotal | scoreFix}}</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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

  @Prop({ type: String, default: 'fit-contain' })
  public coverFit: 'fit-contain' | 'fit-cover';

  @Prop({ type: String })
  public cover: string;

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
}
</script>