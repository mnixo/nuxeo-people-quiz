import { html } from '@polymer/lit-element';

export class NpqSharedStyles {

  static getColorStyle() {
    return html`
      <style>
        :host {
          --background-color-1: #000000;
          --background-color-2: #212121;
          --background-color-3: #303030;
          --background-color-4: #424242;
          --main-color-1: #ffffff;
          --answer-right-color: #1B5E20;
          --answer-wrong-color: #BF360C;
          --text-color-1: var(--main-color-1);
        }
      </style>
    `;
  }

  static getFlexClasses() {
    return html`
      <style>
        .flex-column {
          display: flex;
          flex-direction: column;
        }
        .flex-row {
          display: flex;
          flex-direction: row;
        }
      </style>
    `;
  }

  static getPaperButtonStyle() {
    return html`
      <style>
        paper-button {
          font-size: 1em;
          margin: 0;
          min-height: 0;
          min-width: 0;
          padding: 0.5em;
          text-transform: none;
          background-color: var(--background-color-4);
          color: var(--text-color-1);
        }
        paper-button.answer-right {
          background-color: var(--answer-right-color);
        }
        paper-button.answer-wrong {
          background-color: var(--answer-wrong-color);
        }
      </style>
    `;
  }

  static getPaperCardStyle() {
    return html`
      <style>
        paper-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5em;
          background-color: var(--background-color-3);
          color: var(--text-color-1);
        }
        paper-card > paper-button {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      </style>
    `;
  }

  static getPaperDialogStyle() {
    return html`
      <style>
        paper-dialog {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5em;
          background-color: var(--background-color-3);
          color: var(--text-color-1)
        }
        paper-dialog > * {
          margin: 0;
        }
        paper-dialog > paper-button {
          width: 100%;
        }
      </style>
    `;
  }

  static getPaperToggleButtonStyle() {
    return html`
      <style>
        paper-toggle-button {
          --paper-toggle-button-checked-button-color: var(--main-color-1);
          --paper-toggle-button-checked-bar-color: var(--main-color-1);
          --paper-toggle-button-checked-ink-color: var(--main-color-1);
        }
      </style>
    `;
  }

}
