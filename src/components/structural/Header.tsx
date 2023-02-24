import { faDiscord, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "_redux/reducers/auth.duck";
import Logo from "assets/logo.png";
import LoginContainer from "components/login/loginContainer";
import Aside from "components/structural/Aside";
import { Column, Row } from "components/structural/Grid";
import Group from "components/structural/Group";
import Button from "components/visual/Button";
import { scrollTo, scrollToSection } from "Helpers";
import $ from "jquery";
import React from "react";
import { useSelector } from "react-redux";
import { privacy, terms } from "../../utils/FooterText";
import "./Header.scss";
import Modal from "./Modal";
import "./Modal.scss";

const Header: React.FC<any> = () => {
    const user = useSelector((state: any) => state.auth);

    const clickHandler = (ele: string) => {
        let aside = $("#aside-sidebar-left");
        aside.trigger("toggle");
        scrollTo($(ele));
    };

    return (
        <>
            <header className="header">
                <Row>
                    <Column className="justify-content-center">
                        <Button color="secondary" className="btn-icon-only" toggle="#aside-sidebar-left">
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </Column>
                    <Column className="justify-content-center align-items-center">
                        <a className={"nav-brand logo"} href={"/"}>
                            <img src={Logo} alt="logo" />
                        </a>
                    </Column>
                    <Column className="justify-content-center align-items-end">
                        <Group spacing="1em">
                            <Button href="https://discord.gg/artbot" color="secondary" className="btn-text-light">
                                <FontAwesomeIcon icon={faDiscord} />
                                <span className="hidden-mobile"> Discord</span>
                            </Button>
                            {!user.authToken ? (
                                <>
                                    <Button color="secondary" toggle="#aside-login" className="btn-text-light">
                                        <FontAwesomeIcon icon={faPerson} />
                                        <span className="hidden-mobile"> Log In</span>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button color="secondary" onClick={() => logout()} className="btn-text-light">
                                        <FontAwesomeIcon icon={faPerson} />
                                        <span className="hidden-mobile"> Log Out</span>
                                    </Button>
                                </>
                            )}
                        </Group>
                    </Column>
                </Row>
            </header>
            <Aside id="aside-login" side="right">
                <LoginContainer />
            </Aside>
            <Aside id="aside-sidebar-left" className="main-menu" side="left">
                <h1>
                    <a className={"nav-brand logo"} href={"/"}>
                        <img src={Logo} alt="logo" />
                    </a>
                </h1>
                <div className={"main-menu-contents"}>
                    <ul>
                        <li>
                            <Button color="secondary" size="lg" className="btn-text-light" data-section="0" onClick={() => scrollToSection(0)}>
                                Home
                            </Button>
                        </li>
                        <li>
                            <Button color="secondary" size="lg" className="btn-text-light" data-section="1" onClick={() => scrollToSection(1)}>
                                1. Vote
                            </Button>
                        </li>
                        <li>
                            <Button color="secondary" size="lg" className="btn-text-light" data-section="2" onClick={() => scrollToSection(2)}>
                                2. Crowdfund
                            </Button>
                        </li>
                        <li>
                            <Button color="secondary" size="lg" className="btn-text-light" data-section="3" onClick={() => scrollToSection(3)}>
                                3. Pre-production
                            </Button>
                        </li>
                        <li>
                            <Button color="secondary" size="lg" className="btn-text-light" data-section="4" onClick={() => scrollToSection(4)}>
                                4. Production
                            </Button>
                        </li>
                        <li>
                            <Button color="secondary" size="lg" className="btn-text-light" data-section="5" onClick={() => scrollToSection(5)}>
                                5. Profit!
                            </Button>
                        </li>
                    </ul>
                    <div className={"main-menu-footer"}>
                        <Button color="primary" size="lg">
                            Work in Progress
                        </Button>
                        <Group spacing="1em">
                            <Button color="primary" size="lg" className="btn-icon-only">
                                <FontAwesomeIcon icon={faInstagram} />
                            </Button>
                            <Button color="primary" size="lg" className="btn-icon-only">
                                <FontAwesomeIcon icon={faTiktok} />
                            </Button>
                            <Button color="primary" size="lg" className="btn-icon-only">
                                <FontAwesomeIcon icon={faTwitter} />
                            </Button>
                        </Group>
                        <Group spacing="1em">
                            <Button color="primary" className="mobile-ftr-btn" size="lg" toggle="#modal-terms">
                                Terms & Conditions
                            </Button>
                            <Button color="primary" className="mobile-ftr-btn" size="lg" toggle="#modal-privacy">
                                Privacy Policy
                            </Button>
                        </Group>
                    </div>
                </div>
            </Aside>
            <Modal id="modal-terms">
                <h1>{terms.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: terms.desc }}></div>
            </Modal>
            <Modal id="modal-privacy">
                <h1>{privacy.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: privacy.desc }}></div>
            </Modal>
        </>
    );
};

export default Header;
