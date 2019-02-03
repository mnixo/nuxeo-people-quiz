import { LitElement, html } from '@polymer/lit-element';
import { NpqSharedStyles } from './npq-shared-styles';

class NpqRoundHeader extends LitElement {

  static get properties() {
    return {
      roundNumber: {
        type: Number,
      },
      totalRounds: {
        type: Number,
      },
      time: {
        type: Number,
      },
      points: {
        type: Number,
      },
    }
  }

  constructor() {
    super();
    this.roundNumber = 0;
    this.totalRounds = 0;
    this.time = 0;
    this.points = 0;
  }

  render() {
    return html`
      ${NpqSharedStyles.getFlexClasses()}
      <style>
        h2 {
          margin: 0;
        }
        .container {
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5em 0.5em 0.5em;
        }
        .rounds {
          text-align: left;
          width: 40%;
        }
        .time-left {
          text-align: center;
          width: 20%;
        }
        .points {
          text-align: right;
          width: 40%;
        }
      </style>
      <div class="flex-row container">
        <span class="rounds">${this.roundNumber}/${this.totalRounds}</span>
        <h2 class="time-left">${this.time}</h2>
        <span class="points">${this.points} pts</span>
      </div>
    `;
  }

}
window.customElements.define('npq-round-header', NpqRoundHeader);
