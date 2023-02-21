import React from 'react';
import Button from 'components/visual/Button';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer hidden-desktop">
        <Button className="btn-text-dark mobile-discord-btn">Join Discord</Button>
      </footer>
    );
  }
}

export default Footer;
