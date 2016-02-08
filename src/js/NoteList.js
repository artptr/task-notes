import React from 'react';
import moment from 'moment';

export class NoteList extends React.Component {
  constructor() {
    super();

    window.setInterval(this.forceUpdate.bind(this), 1000);
  }

  handleRemove(i, e) {
    e.preventDefault();

    this.props.onRemove(i);
  }

  render() {
    return (
      <ul className="list">
        {
          this.props.list.map((item, i) => {
            const t = moment(item.date);

            return (
              <li key={item.date.getTime()}>
                <div title={t.format('LLL')}>
                  {t.fromNow()}
                  <a href="#" onClick={this.handleRemove.bind(this, i)}>X</a>
                </div>
                <div>{item.text}</div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
