import React from 'react';
import ReactDOM from 'react-dom';

import {NoteForm} from './NoteForm';
import {NoteList} from './NoteList';

class App {
  constructor(id) {
    this.el = document.getElementById(id);

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);

    this.loadList();
    this.updateList();
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

new App('app');
