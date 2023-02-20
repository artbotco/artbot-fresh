import Helpers        from "Helpers";
import $              from "jquery";
import Page           from "Page";
import React          from "react";
import Tower          from "../assets/tower.png";
import Aside          from "../components/structural/Aside";
import {Card}         from "../components/structural/Card";
import Section        from "../components/structural/Section";
import SectionWrapper from "../components/structural/SectionWrapper";
import Button         from "../components/visual/Button";
import Slide          from "../components/visual/Slide";
import Slider         from "../components/visual/Slider";
import Video          from "../components/visual/Video";
import "./Home.scss";

class HomeContent extends React.Component {

    private scrollTimeout: any;
    private animating = false;

    towerScroll = () => {
        const tower = document.querySelector<HTMLElement>(".tower");
        if (!tower) {
            return;
        }
        const towerStart = document.querySelector<HTMLElement>(".tower-start");
        if (!towerStart) {
            return;
        }

        const towerStartTop = towerStart.offsetTop;
        const bodyHeight = document.body.clientHeight;
        const scrollRange = bodyHeight - window.innerHeight - towerStartTop;

        const windowScroll = window.scrollY - towerStartTop;
        const towerHeight = tower.clientHeight;
        const baseOffset = window.innerHeight + (window.innerHeight * 0.3);

        if (windowScroll < 0) {
            tower.style.top = `${baseOffset}px`;
            return;
        }

        const maxOffset = bodyHeight - towerHeight - (window.innerHeight * 0.3);
        const offsetRange = maxOffset - baseOffset;
        const windowOffsetPercentage = windowScroll / scrollRange;

        const offset = baseOffset + (offsetRange * windowOffsetPercentage);
        tower.style.top = `${offset}px`;
    };

    scrollSnap = (ev: any) => {
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(() => {
            let sections = document.querySelectorAll<HTMLElement>(".section");
            let sectionCenters = [];
            for (let i = 0; i < sections.length; i++) {
                let section = sections[i];
                let sectionCenter = section.offsetTop + (section.clientHeight / 2);
                sectionCenters.push(sectionCenter);
            }
            let currentViewCenter = window.scrollY + (window.innerHeight / 2);
            let closestSection = 0;
            let closestDistance = document.body.clientHeight;
            for (let i = 0; i < sectionCenters.length; i++) {
                let sectionCenter = sectionCenters[i];
                let distance = Math.abs(sectionCenter - currentViewCenter);
                if (distance < closestDistance) {
                    closestSection = i;
                    closestDistance = distance;
                }
            }
            let closestSectionTop = sections[closestSection].offsetTop;
            this.animating = true;
            $("html, body").animate({
                scrollTop: closestSectionTop
            }, 100, () => {
                this.animating = false;
                $("[data-section].active").removeClass("active");
                let sectionNumber = $(sections[closestSection]).attr("data-section");
                $("[data-section=\"" + sectionNumber + "\"]").addClass("active");
            });
        }, 250);
    };

    resizeActiveVideo = () => {
        Helpers.ratioResize($(".video:visible"));
    };

    render() {
        window.addEventListener("scroll", this.towerScroll);
        window.addEventListener("resize", this.towerScroll);
        window.addEventListener("resize", this.resizeActiveVideo);
        $(window).on("load", this.scrollSnap);
        $(window).on("scroll", this.scrollSnap);
        $(window).on("keydown mousedown", this.scrollSnap);
        return (
            <SectionWrapper>
                <Section className="hero" index={0}>
                    <h1>Let's Make a Movie!</h1>
                    <h2>Vote on every step of the movie making process, and earn money as the movie does!</h2>
                    <Slider>
                        <Slide className="active">
                            <Video src="https://www.youtube.com/embed/__jYHX5CGic" />
                            <h3>Birth of ArtBot</h3>
                            <h5>Io Travels Time And Space To Save Great Works Of Art.</h5>
                        </Slide>
                        <Slide>
                            <Video src="https://www.youtube.com/embed/P4KLh3kpH3A" />
                            <h3>Ninja Cats: Teaser One</h3>
                            <h5>Two lifelong friends and apprentice ninja cats take different paths in life after the brutal massacre of their sensei and dojo.</h5>
                        </Slide>
                        <Slide>
                            <Video src="https://www.youtube.com/embed/t1yJSKgJnyo" />
                            <h3>Ninja Cats: Tease Two</h3>
                            <h5>Two lifelong friends and apprentice ninja cats take different paths in life after the brutal massacre of their sensei and dojo.</h5>
                        </Slide>
                    </Slider>
                </Section>

                <img src={Tower} className="tower" alt="tower" />

                <Section className="tower-start" index={1}>
                    <Card>
                        <h2>Vote for your favorite movie idea</h2>
                        <p>We’re starting off with 4 animated movie ideas. Vote for your favorite idea, and once we reach 1,500 votes, we will have selected our movie idea!</p>
                        <Button toggle="#learnmore-projects" className="btn-text-dark">Learn More</Button>
                    </Card>
                </Section>
                <Aside id="learnmore-projects">
                    <h2>Projects</h2>
                    <ul>
                        <li>
                            The Birth of IO the Artbot
                            <ul>
                                <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                            </ul>
                        </li>
                    </ul>
                </Aside>

                <Section index={2}>
                    <Card>
                        <h2>Support the process</h2>
                        <p>Help crowdfund the movie. Back the production at any level you feel comfortable. Different tiers have different benefits.</p>
                        <Button toggle="#learnmore-royalties" className="btn-text-dark">Learn More</Button>
                    </Card>
                </Section>
                <Aside id="learnmore-royalties">
                    <h2>Royalties</h2>
                    <ul>
                        <li>
                            The Birth of IO the Artbot
                            <ul>
                                <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                            </ul>
                        </li>
                    </ul>
                </Aside>

                <Section index={3}>
                    <Card>
                        <h2>Collaborate with the community</h2>
                        <p>Vote on every step of the movie making process. Vote on script ideas or join the writing room and help write the script. Help create concept art to show your own vision for the movie. You can create from your own
                           hand or use Midjourney to create AI concept art.</p>
                        <Button toggle="#learnmore-getinvolved" className="btn-text-dark">Learn More</Button>
                    </Card>
                </Section>
                <Aside id="learnmore-getinvolved">
                    <h2>Get involved</h2>
                    <ul>
                        <li>
                            The Birth of IO the Artbot
                            <ul>
                                <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                            </ul>
                        </li>
                    </ul>
                </Aside>

                <Section index={4}>
                    <Card>
                        <h2>Let’s make our movie</h2>
                        <p>Production begins! Give feedback to the voice actors, animators, and help spread the word.</p>
                        <Button toggle="#learnmore-ai" className="btn-text-dark">Learn More</Button>
                    </Card>
                </Section>
                <Aside id="learnmore-ai">
                    <h2>AI</h2>
                    <ul>
                        <li>
                            The Birth of IO the Artbot
                            <ul>
                                <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                            </ul>
                        </li>
                    </ul>
                </Aside>

                <Section index={5}>
                    <Card>
                        <h2>Release movie and distribute royalties</h2>
                        <p>We will hold a digital and in-person premiere, then release the movie to be rented and streamed on ArtBot.tv</p>
                        <Button toggle="#learnmore-shares" className="btn-text-dark">Learn More</Button>
                    </Card>
                </Section>
                <Aside id="learnmore-shares">
                    <h2>Shares</h2>
                    <ul>
                        <li>
                            The Birth of IO the Artbot
                            <ul>
                                <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                            </ul>
                        </li>
                    </ul>
                </Aside>
            </SectionWrapper>
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
