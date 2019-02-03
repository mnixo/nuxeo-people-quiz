import { LitElement, html } from '@polymer/lit-element';
import { NpqSharedStyles } from './npq-shared-styles';
import { DATA_TS } from '../data';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-toggle-button/paper-toggle-button';

class NpqSettings extends LitElement {

  static get properties() {
    return {
      usableMembers: {
        type: Array,
      },
      _useHighResolution: {
        type: Boolean,
      },
      _useMembersWithoutProfilePhoto: {
        type: Boolean,
      },
      _useMembersWithoutCustomImage: {
        type: Boolean,
      },
    }
  }

  constructor() {
    super();
    this.usableMembers = [];
    this._useHighResolution = this.initializeOption('useHighResolution', false);
    this._useMembersWithoutProfilePhoto = this.initializeOption('useMembersWithoutProfilePhoto', false);
    this._useMembersWithoutCustomImage = this.initializeOption('useMembersWithoutCustomImage', false);
  }

  render() {
    return html`
      ${NpqSharedStyles.getFlexClasses()}
      ${NpqSharedStyles.getPaperButtonStyle()}
      ${NpqSharedStyles.getPaperDialogStyle()}
      ${NpqSharedStyles.getPaperToggleButtonStyle()}
      <style>
        .option {
          width: 100%;
        }
        h3,
        .option {
          padding-bottom: 1em;
        }
        .option {
          justify-content: space-between;
        }
        .option-main {
          padding-right: 1em;
        }
        .option-help {
          font-size: 0.7em;
          opacity: 0.5;
        }
        .info {
          padding-bottom: 1em;
        }
        .settings-container {
          align-items: center;
          padding: 0.5em;
        }
      </style>
      <paper-dialog id="dialog" with-backdrop>
        <div class="flex-column settings-container">
          <h3>Settings</h3>
          ${this._renderUseHighResolutionOption(this._useHighResolution)}
          ${this._renderUseMembersWithoutProfilePhotoOption(this._useMembersWithoutProfilePhoto)}
          ${this._renderUseMembersWithoutCustomImage(this._useMembersWithoutCustomImage)}
          <div class="flex-column info">
            <span class="option-help">${this.usableMembers.length} available members.</span>
            <span class="option-help">Last updated: ${this._getLastUpdatedLabel()}.</span>
          </div>
        </div>
        <paper-button raised dialog-dismiss>Return to the Menu</paper-button>
      </paper-dialog>
    `;
  }

  _renderUseHighResolutionOption(useHighResolution) {
    const label = 'Use high resolution pictures';
    const help = 'Heavy on data usage and might take longer to load.';
    return this._renderOption(useHighResolution, 'useHighResolution', label, help);
  }

  _renderUseMembersWithoutProfilePhotoOption(useMembersWithoutProfilePhoto) {
    const label = 'Include members without profile photo';
    const help = 'Members that have a custom image that is not a profile photo.';
    return this._renderOption(useMembersWithoutProfilePhoto, 'useMembersWithoutProfilePhoto', label, help);
  }

  _renderUseMembersWithoutCustomImage(useMembersWithoutCustomImage) {
    const label = 'Include members without custom image';
    const help = 'Members that have not uploaded a profile image.';
    return this._renderOption(useMembersWithoutCustomImage, 'useMembersWithoutCustomImage', label, help);
  }

  _renderOption(option, localStorageKey, label, help) {
    return html`
      <div class="flex-row option">
        <div class="flex-column option-main">
          <span>${label}</span>
          <span class="option-help">${help}</span>
        </div>
        <paper-toggle-button value="${localStorageKey}" @checked-changed="${this._changed}" .checked="${option}">
        </paper-toggle-button>
      </div>
    `;
  }

  initializeOption(localStorageKey, defaultValue) {
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue === null) {
      this._storeChange(localStorageKey, defaultValue);
    }
    return localStorageValue === null ? false : localStorageValue === 'true';
  }

  open() {
    this.shadowRoot.getElementById('dialog').open();
  }

  _changed(e) {
    this._storeChange(e.target.value, e.detail.value);
  }

  _storeChange(localStorageKey, value) {
    localStorage.setItem(localStorageKey, value);
    this.dispatchEvent(new CustomEvent('settings-changed'));
  }

  _getLastUpdatedLabel() {
    const dt = new Date() - new Date(DATA_TS * 1000);
    const dtHours = dt / 1000 / 60 / 60;
    if (dtHours < 1) {
      return 'just now';
    }
    if (dtHours < 2) {
      return '1 hour ago';
    }
    if (dtHours < 24) {
      return `${Math.floor(dtHours)} hours ago`;
    }
    const dtDays = dtHours / 24;
    if (dtDays < 2) {
      return '1 day ago';
    }
    return `${Math.floor(dtDays)} days ago`;
  }

}
window.customElements.define('npq-settings', NpqSettings);
