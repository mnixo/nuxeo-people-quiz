import { LitElement, html } from '@polymer/lit-element';
import { NpqSharedStyles } from './npq-shared-styles';
import '@polymer/iron-image/iron-image';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-styles/paper-styles';

class NpqMainMenu extends LitElement {

  static get properties() {
    return {
      usableMembers: {
        type: Array,
      },
    }
  }

  constructor() {
    super();
    this.usableMembers = [];
  }

  render() {
    return html`
      ${NpqSharedStyles.getFlexClasses()}
      ${NpqSharedStyles.getPaperButtonStyle()}
      ${NpqSharedStyles.getPaperCardStyle()}
      <style>
        span {
          padding: 0.5em 1em 0 1em;
        }
        iron-image {
          width: 150px;
          height: 150px;
        }
        paper-button {
          margin-top: 0.5em;
        }
        .start-game-buttons {
          width: 100%;
        }
        .start-game-buttons > paper-button {
          padding: 1em;
        }
        .sub-title {
          font-size: 0.7em;
          opacity: 0.5;
        }
      </style>
      <paper-card>
        <span>Nuxeo People Quiz</span>
        <span class="sub-title">So you think you know everyone in the company?</span>
        <iron-image sizing="contain" src="img/logo-white-alpha-500.png"></iron-image>        
        <div class="flex-column start-game-buttons">
          <paper-button raised @tap="${this._onRandom10Tap}">Let's try 10</paper-button>
          <paper-button raised @tap="${this._onRandom50Tap}">Give me 50</paper-button>
          <paper-button raised @tap="${this._onAllTap}">${this._getAllLabel()}</paper-button>
        </div>
        <paper-button raised @tap="${this._onSettings}">Settings</paper-button>
      </paper-card>
    `;
  }

  _getAllLabel() {
    return `All ${this.usableMembers.length}!`;
  }

  _onRandom10Tap() {
    this.dispatchEvent(new CustomEvent('selected-random-10'));
  }

  _onRandom50Tap() {
    this.dispatchEvent(new CustomEvent('selected-random-50'));
  }

  _onAllTap() {
    this.dispatchEvent(new CustomEvent('selected-all'));
  }

  _onSettings() {
    this.dispatchEvent(new CustomEvent('settings'));
  }

}
window.customElements.define('npq-main-menu', NpqMainMenu);
