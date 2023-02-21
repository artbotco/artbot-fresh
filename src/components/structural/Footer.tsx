import React from 'react';
import Button from 'components/visual/Button';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer hidden-desktop mobile-discord-btn">
        <Button className="btn-text-dark">Join Discord</Button>
      </footer>
    );
  }
}

export default Footer;
