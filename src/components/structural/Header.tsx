import {faDiscord, faInstagram, faTiktok, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faBars, faPerson}                            from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon}                             from "@fortawesome/react-fontawesome";
import Logo                                          from "assets/logo.png";
import LoginContainer                                from "components/login/loginContainer";
import Aside                                         from "components/structural/Aside";
import {Column, Row}                                 from "components/structural/Grid";
import Group                                         from "components/structural/Group";
import Button                                        from "components/visual/Button";
import React                                         from "react";
import {connect}                                     from "react-redux";
import "./Header.scss";

class Header extends React.Component<any> {
    // constructor(props: any) {
    //     super(props);
    // }
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
                            <a className={"nav-brand logo"} href={"/"}>
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
                                {this.props.user ? (
                                    <>
                                        <Button
                                            color="secondary"
                                            //   onClick={this.props.logOut()}
                                            className="btn-text-light"
                                        >
                                            <FontAwesomeIcon icon={faPerson} />
                                            <span className="hidden-mobile"> Log Out</span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            color="secondary"
                                            toggle="#aside-login"
                                            className="btn-text-light"
                                        >
                                            <FontAwesomeIcon icon={faPerson} />
                                            <span className="hidden-mobile"> Log In</span>
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
                                <Button
                                    color="secondary"
                                    size="lg"
                                    className="btn-text-light"
                                    data-section="0"
                                >
                                    Home
                                </Button>
                            </li>
                            <li>
                                <Button
                                    color="secondary"
                                    size="lg"
                                    className="btn-text-light"
                                    data-section="1"
                                >
                                    1. Vote
                                </Button>
                            </li>
                            <li>
                                <Button
                                    color="secondary"
                                    size="lg"
                                    className="btn-text-light"
                                    data-section="2"
                                >
                                    2. Crowdfund
                                </Button>
                            </li>
                            <li>
                                <Button
                                    color="secondary"
                                    size="lg"
                                    className="btn-text-light"
                                    data-section="3"
                                >
                                    3. Pre-production
                                </Button>
                            </li>
                            <li>
                                <Button
                                    color="secondary"
                                    size="lg"
                                    className="btn-text-light"
                                    data-section="4"
                                >
                                    4. Production
                                </Button>
                            </li>
                            <li>
                                <Button
                                    color="secondary"
                                    size="lg"
                                    className="btn-text-light"
                                    data-section="5"
                                >
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
                                <Button color="primary" size="lg">
                                    Terms & Conditions
                                </Button>
                                <Button color="primary" size="lg">
                                    Privacy Policy
                                </Button>
                            </Group>
                        </div>
                    </div>
                </Aside>
            </>
        );
    }
}

const mapState = function (state: any) {
    return {
        user: state.auth.user
    };
};

// const mapDispatch = (dispatch: any) => {
//     return (
//         logOut: () => dispatch(logout)
//     )
// };

export default connect(mapState)(Header);
