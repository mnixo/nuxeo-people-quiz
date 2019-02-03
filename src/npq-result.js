import { LitElement, html } from '@polymer/lit-element';
import { NpqUtils } from './npq-utils';
import { NpqSharedStyles } from './npq-shared-styles';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';

class NpqResult extends LitElement {

  static get properties() {
    return {
      _points: {
        type: Number,
      },
      _roundsWon: {
        type: Number,
      },
      _roundsTotal: {
        type: Number,
      },
    }
  }

  constructor() {
    super();
    this._points = 0;
    this._roundsWon = 0;
    this._roundsTotal = 0;
  }

  render() {
    return html`
      ${NpqSharedStyles.getFlexClasses()}
      ${NpqSharedStyles.getPaperButtonStyle()}
      ${NpqSharedStyles.getPaperDialogStyle()}
      <style>
        h1,
        h3 {
          padding: 0;
          margin: 0;
        }
        .rounds {
          margin: 1em 2em;
        }
        .score {
          align-items: center;
          margin: 1em 2em 3em 2em;
        }
      </style>
      <paper-dialog id="dialog" modal with-backdrop>
        <h1 class="rounds">${this._roundsWon}/${this._roundsTotal}</h1>
        <div class="flex-column score">
          <h3>Final Score:</h3>
          <h1>${this._points} pts</h1>
        </div>
        <paper-button raised dialog-dismiss @click="${this._onReturn}">Return to the Menu</paper-button>
      </paper-dialog>
    `;
  }

  open(points, roundsWon, roundsTotal) {
    this._points = points;
    this._roundsWon = roundsWon;
    this._roundsTotal = roundsTotal;
    this.shadowRoot.getElementById('dialog').open();
    NpqUtils.sendEvent('game-over', {
      'event_category' : this._roundsTotal,
      'event_label' : this._roundsWon,
    });
  }

  _onReturn() {
    this.dispatchEvent(new CustomEvent('return'));
  }

}
window.customElements.define('npq-result', NpqResult);
