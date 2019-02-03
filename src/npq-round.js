import { LitElement, html } from '@polymer/lit-element';
import { NpqSharedStyles } from './npq-shared-styles';
import '@polymer/iron-image/iron-image';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import './npq-round-header';

class NpqRound extends LitElement {

  static get properties() {
    return {
      round: {
        type: Object,
      },
      points: {
        type: Number,
      },
      time: {
        type: Number,
      },
    }
  }

  constructor() {
    super();
    this.round = null;
    this.points = 0;
    this.time = 0;
  }

  render() {
    return html`
      ${NpqSharedStyles.getPaperButtonStyle()}
      ${NpqSharedStyles.getPaperCardStyle()}
      <style>
        .container-image {
          padding: 0;
          border-radius: 3px;
        }
        iron-image {
          height: 75vw;
          width: 75vw;
          max-height: 50vh;
          max-width: 50vh;
          border-radius: 3px;
        }
        paper-button {
          margin-top: 0.5em;
          width: 50vh;
          max-width: 75vw;
          height: 3em;
        }
        span {
          word-wrap: break-word;
        }
        npq-round-header {
          width: 100%;
        }
        .title {
          font-size: 0.7em;
          opacity: 0.5;
          text-align: center;
        }
      </style>
      <paper-card class="container-round">
        <npq-round-header
          .roundNumber="${this.round.number}"
          .totalRounds="${this.round.total}"
          .time="${this.time}"
          .points="${this.points}">
        </npq-round-header>
        <paper-card class="container-image">
          <iron-image sizing="contain" src="${this._getImageUrl(this.round.roundMember)}"></iron-image>
        </paper-card>
        ${this._renderChoices(this.round.guessMembers)}
      </paper-card>
    `;
  }

  updated(_changedProperties) {
    if (_changedProperties.has('round')) {
      this.shadowRoot.querySelectorAll('paper-button').forEach(button => {
        button.className = '';
        button.disabled = false;
      });
      this.time = 10;
      this.timeout = this.setTimeout();
    }
  }

  setTimeout() {
    return setTimeout(() => {
      this.time--;
      if (this.time > 0) {
        return this.timeout = this.setTimeout();
      }
      const buttons = Array.from(this.shadowRoot.querySelectorAll('paper-button'));
      buttons.filter(button => button.member === this.round.roundMember)[0].classList.add('answer-right');
      this._sendAnswerEvent(0, 1000);
    }, 1000);
  }

  _getImageUrl(member) {
    const useHighResolution = localStorage.getItem('useHighResolution') === 'true';
    return useHighResolution ? member.imageHighResolution : member.imageLowResolution;
  }

  _renderChoices(guessMembers) {
    return guessMembers.map(guess => html`
      <paper-button raised @tap="${this._onChoiceTap}" .member="${guess}">
        <span class="name">${this._getMemberName(guess)}</span>
        <span class="title">${guess.title}</span>
      </paper-button>
    `);
  }

  _onChoiceTap(e) {
    clearTimeout(this.timeout);
    const chosenButton = e.currentTarget;
    const chosenMember = chosenButton.member;
    const buttons = Array.from(this.shadowRoot.querySelectorAll('paper-button'));
    buttons.forEach(button => button.disabled = true);
    if (chosenMember === this.round.roundMember) {
      chosenButton.classList.add('answer-right');
      const roundPoints = 10 * this.time;
      this.points += roundPoints;
      this._sendAnswerEvent(roundPoints, 1000);
    } else {
      chosenButton.classList.add('answer-wrong');
      buttons.filter(button => button.member === this.round.roundMember)[0].classList.add('answer-right');
      this._sendAnswerEvent(0, 1000);
    }
  }

  _getMemberName(member) {
    const firstName = member.firstName.charAt(0).toUpperCase() + member.firstName.slice(1);
    const lastName = member.lastName.charAt(0).toUpperCase() + member.lastName.slice(1);
    return `${firstName} ${lastName}`;
  }

  _sendAnswerEvent(points, timeout) {
    setTimeout(() => this.dispatchEvent(new CustomEvent('answer', {
      detail: {
        points,
      },
    })), timeout);
  }

}
window.customElements.define('npq-round', NpqRound);
