import React from 'react';
import moment from 'moment';

export class NoteList extends React.Component {
  constructor() {
    super();

    window.setInterval(this.forceUpdate.bind(this), 1000);
  }

  handleRemove(i, e) {
    e.preventDefault();

    if (confirm('Действительно удалить заметку?')) {
      this.props.onRemove(i);
    }
  }

  render() {
    return (
      <ul className="list">
        {
          this.props.list.map((item, i) => {
            const t = moment(item.date);

            return (
              <li className="list__item note" key={item.date.getTime()}>
                <div className="note__time" title={t.format('LLL')}>{t.fromNow()}</div>
                <div className="note__remove" title="Удалить" onClick={this.handleRemove.bind(this, i)}>&#x2715;</div>
                <div className="note__text">{item.text}</div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
