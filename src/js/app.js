import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import {NoteForm} from './NoteForm';
import {NoteList} from './NoteList';

class App {
  constructor(id) {
    this.el = document.getElementById(id);

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);

    this.loadList();
    this.updateList();

    window.fillNotes = this.fillNotes.bind(this);
    window.clearNotes = this.clearNotes.bind(this);
  }

  loadList() {
    try {
      this.list = JSON.parse(window.localStorage.getItem('notes'));
    } catch (ex) {}
    this.list = (this.list || []).map(item => {
      item.date = new Date(item.date);
      return item;
    });
  }

  fillNotes() {
    const oldest = this.list[this.list.length - 1] || { date: new Date() };
    const d = oldest.date;

    for (let i = 1; i <= 100; ++i) {
      this.list.push({
        text: 'Lorem ipsum dolor',
        date: moment(d).subtract(i, 'days').toDate()
      });
    }
    this.updateList();
  }

  clearNotes() {
    this.list = [];
    this.updateList();
  }

  updateList() {
    window.localStorage.setItem('notes', JSON.stringify(this.list));
    this.render();
  }

  handleAddNote(text, date) {
    this.list.unshift({ text, date });
    this.updateList();
  }

  handleRemoveNote(id) {
    this.list.splice(id, 1);
    this.updateList();
  }

  render() {
    ReactDOM.render((
      <div className="app">
        <NoteForm onAdd={this.handleAddNote} />
        <NoteList list={this.list} onRemove={this.handleRemoveNote} />
      </div>
    ), this.el);
  }
}

moment.locale('ru');
new App('app');
