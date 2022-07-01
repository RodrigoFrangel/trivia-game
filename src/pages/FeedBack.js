import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
    state = {
      mensagem: '',
      checkedMensage: false,
    };

    componentDidMount() {
      this.funcTest();
    }

    funcTest = () => {
      const { getAssertions } = this.props;
      console.log(typeof getAssertions);
      const assertionsParam = 3;
      if (getAssertions < assertionsParam) {
        this.setState({
          mensagem: 'Could be better...',
          checkedMensage: true,
        });
      } else {
        this.setState = ({
          mensagem: 'Well Done!',
          checkedMensage: true,
        });
      }
    }

    hashEmail = () => {
      const { getEmail } = this.props;
      const emailConvertido = md5(getEmail).toString();
      const gravatar = `https://www.gravatar.com/avatar/${emailConvertido}`;
      return gravatar;
    };

    render() {
      const { getName, getScore } = this.props;
      const { checkedMensage, mensagem } = this.state;
      return (

        <header>
          <img
            data-testid="header-profile-picture"
            alt="profile-pic"
            src={ this.hashEmail() }
          />
          <div data-testid="header-player-name">
            { getName }
          </div>
          <div data-testid="header-score">{getScore}</div>
          <p data-testid="feedback-text">
            { checkedMensage && mensagem }
          </p>
        </header>

      );
    }
}

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
  getScore: state.player.score,
  getAssertions: state.player.assertions,
});

Feedback.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
