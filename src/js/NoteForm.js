import React from 'react';
import classnames from 'classnames';
import placeholder from 'react-input-placeholder';

const limit = 200;

const Input = placeholder(React).Input;

export class NoteForm extends React.Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  isEmpty() {
    return this.state.text.length === 0;
  }

  isOverflow() {
    return this.state.text.length > limit;
  }

  canSubmit() {
    return !this.isEmpty() && !this.isOverflow();
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.canSubmit()) {
      this.props.onAdd(this.state.text, new Date());
      this.setState({text: ''});
    }
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  render() {
    const formClasses = classnames(
      'form',
      { 'form--error':this.isOverflow() },
      { 'form--can-submit': this.canSubmit() }
    );

    return (
      <form className={formClasses} onSubmit={this.handleSubmit}>
        <Input
          type="text"
          className="form__note"
          placeholder="Введите заметку"
          value={this.state.text}
          onChange={this.handleTextChange} />
        <input
          type="submit"
          className="form__submit"
          value="&#x2713;" />
      </form>
    );
  }
}
