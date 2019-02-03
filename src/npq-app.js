import { LitElement, html } from '@polymer/lit-element';
import { NpqSharedStyles } from './npq-shared-styles';
import { NpqUtils } from './npq-utils';
import { DATA } from '../data';
import './npq-game';
import './npq-main-menu';
import './npq-result';
import './npq-settings';

class NpqApp extends LitElement {

  static get properties() {
    return {
      _data: {
        type: Array,
      },
      _usableMembers: {
        type: Array,
      },
      _shouldRenderMainMenu: {
        type: Boolean,
      },
      _shouldRenderGame: {
        type: Boolean,
      },
    }
  }

  constructor() {
    super();
    this._data = DATA.map(encodedString => JSON.parse(decodeURIComponent(atob(encodedString))));
    this._usableMembers = [];
    this._shouldRenderMainMenu = true;
    this._shouldRenderGame = false;
  }

  render() {
    return html`
      ${NpqSharedStyles.getColorStyle()}
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          justify-content: center;
          align-items: center;
          background-color: var(--background-color-2);
        }
      </style>
      <npq-main-menu
        .usableMembers="${this._usableMembers}"
        ?hidden="${!this._shouldRenderMainMenu}"
        @selected-random-10="${this._onRandom10Selected}"
        @selected-random-50="${this._onRandom50Selected}"
        @selected-all="${this._onAllSelected}"
        @settings="${this._onSettings}">
      </npq-main-menu>
      <npq-game id="game" .data="${this._data}" ?hidden="${!this._shouldRenderGame}" @over="${this._onGameOver}">
      </npq-game>
      <npq-settings id="settings" .usableMembers="${this._usableMembers}" @settings-changed="${this._onSettingsChanged}"></npq-settings>
      <npq-result id="result" @return="${this._onReturnToMenu}"></npq-result>
    `;
  }

  _onSettingsChanged() {
    const useMembersWithoutProfilePhoto = localStorage.getItem('useMembersWithoutProfilePhoto') === 'true';
    const useMembersWithoutCustomImage = localStorage.getItem('useMembersWithoutCustomImage') === 'true';
    this._usableMembers = NpqUtils.getUsableMembers(this._data, useMembersWithoutCustomImage, useMembersWithoutProfilePhoto);
  }

  _startGame(rounds) {
    this._shouldRenderMainMenu = false;
    this._shouldRenderGame = true;
    this.shadowRoot.getElementById('game').startGame(rounds);
  }

  _onRandom10Selected() {
    this._startGame(10);
  }

  _onRandom50Selected() {
    this._startGame(50);
  }

  _onAllSelected() {
    this._startGame(this._usableMembers.length);
  }

  _onSettings() {
    this.shadowRoot.getElementById('settings').open();
  }

  _onGameOver(e) {
    this.shadowRoot.getElementById('result').open(e.detail.points, e.detail.roundsWon, e.detail.roundsTotal);
  }

  _onReturnToMenu() {
    this._shouldRenderMainMenu = true;
    this._shouldRenderGame = false;
  }

}
window.customElements.define('npq-app', NpqApp);
