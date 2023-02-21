import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faBars, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'assets/logo.png';
import Aside from 'components/structural/Aside';
import { Column, Row } from 'components/structural/Grid';
import Group from 'components/structural/Group';
import Button from 'components/visual/Button';
import React from 'react';
import LoginContainer from 'components/login/loginContainer';
import './Header.scss';

class Header extends React.Component {
  render() {
    return (
      <>
        <header className="header">
          <Row>
            <Column className="justify-content-center">
              <Button
                color="secondary"
                className="btn-icon-only"
                toggle="#aside-sidebar-left"
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </Column>
            <Column className="justify-content-center align-items-center">
              <a className={'nav-brand logo'} href={'/'}>
                <img src={Logo} alt="logo" />
              </a>
            </Column>
            <Column className="justify-content-center align-items-end">
              <Group spacing="1em">
                <Button
                  href="https://discord.gg/artbot"
                  color="secondary"
                  className="btn-text-light"
                >
                  <FontAwesomeIcon icon={faDiscord} />
                  <span className="hidden-mobile"> Discord</span>
                </Button>
                <Button
                  color="secondary"
                  toggle="#aside-login"
                  className="btn-text-light"
                >
                  <FontAwesomeIcon icon={faPerson} />
                  <span className="hidden-mobile"> Log In</span>
                </Button>
              </Group>
            </Column>
          </Row>
        </header>
        <Aside id="aside-login" side="right">
          <h1>Log in/Sign up</h1>
          <LoginContainer />
        </Aside>
        <Aside id="aside-sidebar-left" side="left">
          <h1>Left Sidebar</h1>
        </Aside>
      </>
    );
  }
}

export default Header;
