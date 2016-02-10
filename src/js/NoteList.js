import React from 'react';
import moment from 'moment';

const noop = () => {};

function formatTime(m) {
  const hours = moment().diff(m, 'hours');

  switch (true) {
    case hours > 6*24:
      return m.format('LLL');

    case hours > 22:
      return m.calendar();

    default:
      return m.fromNow();
  }
}

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
            const key = item.date.getTime();
            const humanTime = formatTime(t).toLowerCase();
            const fullTime = t.format('LLL').toLowerCase();
            const handleRemove = this.handleRemove.bind(this, i);

            return (
              <li className="list__item note" key={key} onClick={noop}>
                <div className="note__time" title={fullTime}>{humanTime}</div>
                <div className="note__remove" title="Удалить" onClick={handleRemove}>&#x2715;</div>
                <div className="note__text">{item.text}</div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
