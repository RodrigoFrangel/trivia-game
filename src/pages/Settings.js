import React from 'react';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h2
          data-testid="settings-title"
          className="settings-title"
        >
          Trivia Settings
        </h2>
        <p>{ 'There\'s nothing here yet :/' }</p>
      </div>
    );
  }
}

export default Settings;
