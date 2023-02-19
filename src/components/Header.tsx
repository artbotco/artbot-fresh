import React from 'react';
import './Header.scss';
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Logo from '../assets/logo.png'
import Group from "./Group";
import {Row, Column} from "./Grid";

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <Row>
                    <Column className="justify-content-center"><Button color="secondary" className="sidebar-left-toggle"><FontAwesomeIcon icon={faBars} /></Button></Column>
                    <Column className="justify-content-center align-items-center"><a className={"nav-brand logo"} href={"/"}><img src={Logo} alt="logo" /></a></Column>
                    <Column className="justify-content-center align-items-end">
                        <Group spacing="1em">
                            <Button color="secondary" className="btn-text-light">Get Started</Button>
                            <Button color="secondary" className="btn-text-light">Log In</Button>
                        </Group>
                    </Column>
                </Row>
            </header>
        );
    }
}

export default Header;