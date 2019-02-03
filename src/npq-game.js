import { LitElement, html } from '@polymer/lit-element';
import '@polymer/iron-image/iron-image';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import './npq-round';

class NpqGame extends LitElement {

  static get properties() {
    return {
      data: {
        type: Array,
      },
      _membersUsed: {
        type: Array,
      },
      _roundsPlayed: {
        type: Number,
      },
      _roundsWon: {
        type: Number,
      },
      _roundsTotal: {
        type: Number,
      },
      _points: {
        type: Number,
      },
      _round: {
        type: Object,
      },
      _roundTime: {
        type: Number,
      },
    }
  }

  constructor() {
    super();
    this.data = [];
    this._membersUsed = [];
    this._roundsPlayed = 0;
    this._roundsWon = 0;
    this._roundsTotal = 0;
    this._points = 0;
    this._round = null;
    this._roundTime = 0;
  }

  render() {
    if (!this._round) {
      return null;
    }
    return html`
      <npq-round id="round" @answer="${this._onAnswer}"
        .round="${this._round}"
        .points="${this._points}"
        .time="${this._roundTime}">  
      </npq-round>
    `;
  }

  startGame(rounds) {
    this._membersUsed = [];
    this._roundsPlayed = 0;
    this._roundsWon = 0;
    this._roundsTotal = rounds;
    this._points = 0;
    this._startRound();
  }

  _onAnswer(e) {
    this._points += e.detail.points;
    if (e.detail.points) {
      this._roundsWon++;
    }
    if (this._round.number < this._round.total) {
      this._startRound();
    } else {
      this.dispatchEvent(new CustomEvent('over', {
        detail: {
          points: this._points,
          roundsWon: this._roundsWon,
          roundsTotal: this._roundsTotal,
        },
      }));
    }
  }

  _startRound() {
    this._roundsPlayed += 1;
    this._round = {};
    const roundMember = this._getRoundMember();
    let guessMembers = this._getGuessMembers(3, roundMember.gender);
    guessMembers.push(roundMember);
    guessMembers = this._getShuffledArray(guessMembers);
    this._round = {
      roundMember,
      guessMembers,
      number: this._roundsPlayed,
      total: this._roundsTotal,
      points: this._points,
    };
  }

  _getRoundMember() {
    const useMembersWithoutCustomImage = localStorage.getItem('useMembersWithoutCustomImage') === 'true';
    const useMembersWithoutProfilePhoto = localStorage.getItem('useMembersWithoutProfilePhoto') === 'true';
    // filter the available members (the ones that have not been used yet)
    let availableMembers = this.data.filter(member => !this._membersUsed.includes(member));
    // filter out members without custom images
    if (!useMembersWithoutCustomImage) {
      availableMembers = availableMembers.filter(member => member.isCustomImage);
    }
    // filter out members without profile photos
    if (!useMembersWithoutProfilePhoto) {
      availableMembers = availableMembers.filter(member => member.isProfilePhoto);
    }
    const roundMember = this._getRandomElementFromArray(availableMembers);
    this._membersUsed.push(roundMember);
    return roundMember;
  }

  _getGuessMembers(amount, gender) {
    const guessMembers = [];
    const availableMembers = this.data
      .filter(member => !this._membersUsed.includes(member))
      .filter(member => member.gender === gender);
    for (let i = 0; i < amount; i++) {
      if (availableMembers.length === 0) {
        const usedMembers = this.data
          .filter(member => this._membersUsed.includes(member))
          .filter(member => !guessMembers.includes(member))
          .filter(member => member.gender === gender);
        guessMembers.push(this._getRandomElementFromArray(usedMembers));
      } else {
        const guessMember = this._getRandomElementFromArray(availableMembers);
        availableMembers.splice(availableMembers.indexOf(guessMember), 1);
        guessMembers.push(guessMember);
      }
    }
    return guessMembers;
  }

  _getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  _getShuffledArray(array) {
    const shuffledArray = [];
    const clone = array.splice(0);
    while (clone.length > 0) {
      const element = this._getRandomElementFromArray(clone);
      clone.splice(clone.indexOf(element), 1);
      shuffledArray.push(element);
    }
    return shuffledArray;
  }

}
window.customElements.define('npq-game', NpqGame);
