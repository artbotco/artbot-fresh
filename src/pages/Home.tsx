import ScrollCTA from "assets/scroll-cta.png";
import PackagesTable from "components/packages/PackagesTable";
import { Card } from "components/structural/Card";
import Modal from "components/structural/Modal";
import Section from "components/structural/Section";
import SectionWrapper from "components/structural/SectionWrapper";
import Button from "components/visual/Button";
import Slide from "components/visual/Slide";
import Slider from "components/visual/Slider";
import StarryNight from "components/visual/StarryNight";
import Tower from "components/visual/Tower";
import Video from "components/visual/Video";
import { ratioResize, scrollToSection } from "Helpers";
import $ from "jquery";
import Page from "Page";
import React from "react";
import AsideAccordion from "components/structural/AsideAccordion";
import "./Home.scss";

class HomeContent extends React.Component {
    resizeActiveVideo = () => {
        ratioResize($(".video:visible"));
    };

    closeAsides = (ev: any) => {
        let target = $(ev.target);
        if (target.closest("[data-toggle]").length) {
            target = target.closest("[data-toggle]");
        }
        let activeModal = $(".modal.active");
        if (activeModal.length) {
            if (this.attemptClose(activeModal, target)) {
                return true;
            }
        }
        let activeAside = $(".aside.active");
        if (activeAside.length) {
            if (this.attemptClose(activeAside, target)) {
                return true;
            }
        }
    };

    attemptClose(active: JQuery, target: JQuery) {
        if (!active.hasClass("active")) {
            return false;
        }
        if (target.hasClass("close")) {
            return false;
        }
        if (target.closest(active).length && !target.is(".modal")) {
            return false;
        }
        if (target.is(".modal button") || target.is(".aside button")) {
            return false;
        }
        if ((target.closest(".modal").is(".active") || target.closest(".aside").is(".active")) && !target.is(".modal")) {
            return false;
        }
        if (target.attr("data-toggle") === "#" + active.attr("id")) {
            return false;
        }
        if (target.attr("data-notoggle") === "#" + active.attr("id")) {
            return false;
        }

        active.trigger("toggle");
        return true;
    }

    componentDidMount() {
        window.addEventListener("resize", this.resizeActiveVideo);
        $(window).on("click", this.closeAsides);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeActiveVideo);
        $(window).off("click", this.closeAsides);
    }

    render() {
        return (
            <>
                <StarryNight />
                <SectionWrapper>
                    <Section className="hero" index={0}>
                        <h1 className="hero-title">Let&apos;s Make a Movie!</h1>
                        <h2 className="hero-tagline">Vote on every step of the movie making process, and earn money as the movie does!</h2>
                        <Slider>
                            <Slide className="active">
                                <Video src="https://www.youtube.com/embed/__jYHX5CGic" />
                                <div className="hero-slidecard">
                                    <h3>Birth of ArtBot</h3>
                                    <h5>Io Travels Time And Space To Save Great Works Of Art.</h5>
                                </div>
                            </Slide>
                            <Slide>
                                <Video src="https://www.youtube.com/embed/P4KLh3kpH3A" />
                                <div className="hero-slidecard">
                                    <h3>Ninja Cats: Teaser One</h3>
                                    <h5>Two lifelong friends and apprentice ninja cats take different paths in life after the brutal massacre of their sensei and dojo.</h5>
                                </div>
                            </Slide>
                            <Slide>
                                <Video src="https://www.youtube.com/embed/t1yJSKgJnyo" />
                                <div className="hero-slidecard">
                                    <h3>Ninja Cats: Tease Two</h3>
                                    <h5>Two lifelong friends and apprentice ninja cats take different paths in life after the brutal massacre of their sensei and dojo.</h5>
                                </div>
                            </Slide>
                        </Slider>
                        <img src={ScrollCTA} className="scroll-cta" onClick={() => scrollToSection(1)} alt="Scroll down to see more" />
                    </Section>
                    <Section className="tower-start" index={1}>
                        <Card>
                            <h2>Vote for your favorite movie idea</h2>
                            <p>We’re starting off with 4 animated movie ideas. Vote for your favorite idea, and once we reach 1,500 votes, we will have selected our movie idea!</p>
                            <Button toggle="#learnmore-projects" className="btn-text-dark">
                                Learn More
                            </Button>
                        </Card>
                    </Section>
                    <Section index={2}>
                        <Card>
                            <h2>Support the process</h2>
                            <p>Help crowdfund the movie. Back the production at any level you feel comfortable. Different tiers have different benefits.</p>
                            <Button toggle="#modal-plans" className="btn-text-dark">
                                Learn More
                            </Button>
                        </Card>
                    </Section>
                    <Section index={3}>
                        <Card>
                            <h2>Collaborate with the community</h2>
                            <p>
                                Vote on every step of the movie making process. Vote on script ideas or join the writing room and help write the script. Help create concept art to show your own vision for the movie. You can create from your
                                own hand or use Midjourney to create AI concept art.
                            </p>
                            <Button toggle="#learnmore-getinvolved" className="btn-text-dark">
                                Learn More
                            </Button>
                        </Card>
                    </Section>
                    <Section index={4}>
                        <Card>
                            <h2>Let’s make our movie</h2>
                            <p>Production begins! Give feedback to the voice actors, animators, and help spread the word.</p>
                            <Button toggle="#learnmore-ai" className="btn-text-dark">
                                Learn More
                            </Button>
                        </Card>
                    </Section>
                    <Section index={5}>
                        <Card>
                            <h2>Release movie and distribute royalties</h2>
                            <p>We will hold a digital and in-person premiere, then release the movie to be rented and streamed on ArtBot.tv</p>
                            <Button toggle="#learnmore-shares" className="btn-text-dark">
                                Learn More
                            </Button>
                        </Card>
                    </Section>
                </SectionWrapper>
                <AsideAccordion id="learnmore-projects" />
                <AsideAccordion id="learnmore-royalties" />
                <AsideAccordion id="learnmore-getinvolved" />
                <AsideAccordion id="learnmore-ai" />
                <Tower />
                <AsideAccordion id="learnmore-shares" />
                <Modal id="modal-plans">
                    {" "}
                    <PackagesTable />
                </Modal>
            </>
        );
    }
}

class Home extends Page {
    name = "home";

    renderPage(): JSX.Element {
        return (
            <div className={this.name}>
                <HomeContent />
            </div>
        );
    }
}

export default Home;
