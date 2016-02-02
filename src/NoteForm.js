import React from 'react';

export class NoteForm extends React.Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  canSubmit() {
    return this.state.text.length > 0;
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
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.text} onChange={this.handleTextChange} />
        <input type="submit" disabled={!this.canSubmit()} />
      </form>
    );
  }
}
