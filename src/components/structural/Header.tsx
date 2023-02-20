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
                    <Column className="justify-content-center"><Button color="secondary" className="sidebar-left-toggle"><FontAwesomeIcon icon={faBars} /></Button></Column>
                    <Column className="justify-content-center align-items-center"><a className={"nav-brand logo"} href={"/"}><img src={Logo} alt="logo" /></a></Column>
                    <Column className="justify-content-center align-items-end">
                        <Group spacing="1em" className="hidden-mobile">
                            <Button color="secondary" className="btn-text-light">Join Discord</Button>
                            <Button color="secondary" toggle='#aside-login' className="btn-text-light">Log In</Button>
                        </Group>
                        <Button color="secondary" className="btn-text-light hidden-desktop"><FontAwesomeIcon icon={faPerson}/></Button>
                    </Column>
                </Row>
            </header>
                <Aside id="aside-login" side="right" className="aside-login"></Aside>
            </>
        );
    }
}

export default Header;