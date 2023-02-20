import {faBars, faPerson} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon}  from "@fortawesome/react-fontawesome";
import React              from "react";
import Logo               from "assets/logo.png";
import Aside              from "components/structural/Aside";
import Button             from "components/visual/Button";
import {Column, Row}      from "components/structural/Grid";
import Group              from "components/structural/Group";
import "./Header.scss";

class Header extends React.Component {
    render() {
        return (
            <>
            <header className="header">
                <Row>
                    <Column className="justify-content-center"><Button color="secondary" toggle="#aside-sidebar-left"><FontAwesomeIcon icon={faBars} /></Button></Column>
                    <Column className="justify-content-center align-items-center"><a className={"nav-brand logo"} href={"/"}><img src={Logo} alt="logo" /></a></Column>
                    <Column className="justify-content-center align-items-end">
                        <Group spacing="1em" className="hidden-mobile">
                            <Button href="https://discord.gg/artbot" color="secondary" className="btn-text-light">Join Discord</Button>
                            <Button color="secondary" toggle='#aside-login' className="btn-text-light">Log In</Button>
                        </Group>
                        <Button color="secondary" className="btn-text-light hidden-desktop"><FontAwesomeIcon icon={faPerson}/></Button>
                    </Column>
                </Row>
            </header>
                <Aside id="aside-login" side="right">
                    <h1>Log in/Sign up</h1>
                </Aside>
                <Aside id="aside-sidebar-left" side="left">
                    <h1>Left Sidebar</h1>
                </Aside>
            </>
        );
    }
}

export default Header;