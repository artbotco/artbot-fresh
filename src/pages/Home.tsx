import ScrollCTA      from "assets/scroll-cta.png";
import Tower          from "assets/tower.png";
import Aside          from "components/structural/Aside";
import {Card}         from "components/structural/Card";
import Section        from "components/structural/Section";
import SectionWrapper from "components/structural/SectionWrapper";
import Button         from "components/visual/Button";
import Slide          from "components/visual/Slide";
import Slider         from "components/visual/Slider";
import Video          from "components/visual/Video";
import Helpers        from "Helpers";
import $              from "jquery";
import Page           from "Page";
import React          from "react";
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
        const baseOffset = window.innerHeight + window.innerHeight * 0.3;

        if (windowScroll < 0) {
            tower.style.top = `${baseOffset}px`;
            return;
        }

        const maxOffset = bodyHeight - towerHeight - window.innerHeight * 0.3;
        const offsetRange = maxOffset - baseOffset;
        const windowOffsetPercentage = windowScroll / scrollRange;

        const offset = baseOffset + offsetRange * windowOffsetPercentage;
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
                let sectionCenter = section.offsetTop + section.clientHeight / 2;
                sectionCenters.push(sectionCenter);
            }
            let currentViewCenter = window.scrollY + window.innerHeight / 2;
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
            this.animating = true;
            Helpers.scrollTo(sections[closestSection], undefined, () => {
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
                    <h2>
                        Vote on every step of the movie making process, and earn money as
                        the movie does!
                    </h2>
                    <Slider>
                        <Slide className="active">
                            <Video src="https://www.youtube.com/embed/__jYHX5CGic" />
                            <h3>Birth of ArtBot</h3>
                            <h5>Io Travels Time And Space To Save Great Works Of Art.</h5>
                        </Slide>
                        <Slide>
                            <Video src="https://www.youtube.com/embed/P4KLh3kpH3A" />
                            <h3>Ninja Cats: Teaser One</h3>
                            <h5>
                                Two lifelong friends and apprentice ninja cats take different
                                paths in life after the brutal massacre of their sensei and
                                dojo.
                            </h5>
                        </Slide>
                        <Slide>
                            <Video src="https://www.youtube.com/embed/t1yJSKgJnyo" />
                            <h3>Ninja Cats: Tease Two</h3>
                            <h5>
                                Two lifelong friends and apprentice ninja cats take different
                                paths in life after the brutal massacre of their sensei and
                                dojo.
                            </h5>
                        </Slide>
                    </Slider>
                    <img src={ScrollCTA} className="scroll-cta" onClick={this.scrollToFirstSection} alt="Scroll down to see more" />
                </Section>

                <img src={Tower} className="tower" alt="tower" />

                <Section className="tower-start" index={1}>
                    <Card>
                        <h2>Vote for your favorite movie idea</h2>
                        <p>
                            We’re starting off with 4 animated movie ideas. Vote for your
                            favorite idea, and once we reach 1,500 votes, we will have
                            selected our movie idea!
                        </p>
                        <Button toggle="#learnmore-projects" className="btn-text-dark">
                            Learn More
                        </Button>
                    </Card>
                </Section>
                <Aside id="learnmore-projects">
                    <h2>Projects</h2>
                    <ul className="modal-list">
                        <li>
                            The Birth of IO the Artbot
                            <ul>
                                <li>
                                    A sentient robot, born of two junkyard robots, travels to
                                    earth after being inspired by movies, and helps a girl save
                                    her apartment building by putting on a great show.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Ninja Cats
                            <ul>
                                <li>
                                    Two lifelong friends and apprentice ninja cats take different
                                    paths in life after the brutal massacre of their sensei and
                                    dojo.
                                </li>
                            </ul>
                        </li>
                        <li>
                            The Last Humans
                            <ul>
                                <li>
                                    In a post-apocalyptic world that has been overtaken by nature,
                                    raiders attack a village, and a brother escapes with his
                                    sister as they begin a mission to find a mythical city.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Saving Ai
                            <ul>
                                <li>
                                    The world has adopted the metaverse in every aspect of life,
                                    and when news leaks that the first true AI is about to be
                                    created, the race is on to control it, destroy it, or rescue
                                    it.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Aside>

                <Section index={2}>
                    <Card>
                        <h2>Support the process</h2>
                        <p>
                            Help crowdfund the movie. Back the production at any level you
                            feel comfortable. Different tiers have different benefits.
                        </p>
                        <Button toggle="#learnmore-royalties" className="btn-text-dark">
                            Learn More
                        </Button>
                    </Card>
                </Section>
                <Aside id="learnmore-royalties">
                    <h2>Royalties</h2>
                    <ul className="modal-list">
                        <li>
                            Extra -{" "}
                            <a href="https://www.google.com/search?q=extra+benefits">
                                Benefits
                            </a>
                        </li>
                        <li>
                            Assistant -{" "}
                            <a href="https://www.google.com/search?q=assistant+benefits">
                                Benefits
                            </a>
                        </li>
                        <li>
                            Gaffer -{" "}
                            <a href="https://www.google.com/search?q=gaffer+benefits">
                                Benefits
                            </a>
                        </li>
                        <li>
                            Stuntperson -{" "}
                            <a href="https://www.google.com/search?q=stuntperson+benefits">
                                Benefits
                            </a>
                        </li>
                        <li>
                            Producer -{" "}
                            <a href="https://www.google.com/search?q=producer+benefits">
                                Benefits
                            </a>
                        </li>
                        <li>
                            Executive -{" "}
                            <a href="https://www.google.com/search?q=executive+benefits">
                                Benefits
                            </a>
                        </li>
                    </ul>
                </Aside>

                <Section index={3}>
                    <Card>
                        <h2>Collaborate with the community</h2>
                        <p>
                            Vote on every step of the movie making process. Vote on script
                            ideas or join the writing room and help write the script. Help
                            create concept art to show your own vision for the movie. You can
                            create from your own hand or use Midjourney to create AI concept
                            art.
                        </p>
                        <Button toggle="#learnmore-getinvolved" className="btn-text-dark">
                            Learn More
                        </Button>
                    </Card>
                </Section>
                <Aside id="learnmore-getinvolved">
                    <h2>Get involved</h2>
                    <ul className="modal-list">
                        <li>
                            Concept Development:
                            <ul>
                                <li>Develop the premise and theme of top-voted movie idea</li>
                                <li>Define the target audience</li>
                            </ul>
                        </li>
                        <li>
                            Script Writing:
                            <ul>
                                <li>Write and vote on script treatments</li>
                                <li>Write and vote on spec scripts</li>
                                <li>Write and vote on the final script</li>
                                <li>Revise the script as needed</li>
                            </ul>
                        </li>
                        <li>
                            Storyboarding:
                            <ul>
                                <li>
                                    Create and vote on the visual representations of the script
                                </li>
                                <li>Decide on camera angles, shots, and transitions</li>
                            </ul>
                        </li>
                        <li>
                            Character Design:
                            <ul>
                                <li>
                                    Create and vote on the design of the characters and their
                                    personalities
                                </li>
                                <li>
                                    Decide on their costumes, hairstyles, and other physical
                                    attributes
                                </li>
                            </ul>
                        </li>
                        <li>
                            Background Design:
                            <ul>
                                <li>
                                    Create and vote on the design of the environments and settings
                                    in which the characters will live and move
                                </li>
                                <li>
                                    Decide on the color palette and visual style of the film
                                </li>
                            </ul>
                        </li>
                        <li>
                            Sound Design:
                            <ul>
                                <li>Vote on sound director(s) and/or composer(s)</li>
                                <li>Plan the sound effects and music</li>
                                <li>Create a sound effects library</li>
                                <li>Create a musical score</li>
                            </ul>
                        </li>
                        <li>
                            Voice Over Casting:
                            <ul>
                                <li>Vote on the voice actors for each character</li>
                                <li>Determine the vocal range and tone for each character</li>
                            </ul>
                        </li>
                        <li>
                            Animation:
                            <ul>
                                <li>
                                    Vote on animators and technicians to bring the story to life
                                </li>
                                <li>Schedule the animation and post-production phases</li>
                            </ul>
                        </li>
                        <li>
                            Budgeting and Scheduling:
                            <ul>
                                <li>Determine the final budget for the film</li>
                                <li>Create a detailed production schedule</li>
                                <li>Allocate resources and personnel as needed</li>
                            </ul>
                        </li>
                        <li>
                            Final Preparation:
                            <ul>
                                <li>Assemble the final storyboard</li>
                                <li>Review and refine the character designs</li>
                                <li>Review and refine the background designs</li>
                                <li>Review and refine the sound design</li>
                                <li>Confirm the budget and production schedule</li>
                            </ul>
                        </li>
                    </ul>
                </Aside>

                <Section index={4}>
                    <Card>
                        <h2>Let’s make our movie</h2>
                        <p>
                            Production begins! Give feedback to the voice actors, animators,
                            and help spread the word.
                        </p>
                        <Button toggle="#learnmore-ai" className="btn-text-dark">
                            Learn More
                        </Button>
                    </Card>
                </Section>
                <Aside id="learnmore-ai">
                    <h2>
                        We can use AI to help enable the animation process, starting with
                        key frames
                    </h2>
                    <ul>
                        <li>
                            Preparation:
                            <ul>
                                <li>
                                    Gather the necessary assets, including character designs,
                                    background designs, and storyboards
                                </li>
                                <li>
                                    Ensure all assets are properly formatted for use with the AI
                                    tools
                                </li>
                            </ul>
                        </li>
                        <li>
                            Key Frame Generation:
                            <ul>
                                <li>
                                    Use AI-powered key frame generation software to automatically
                                    generate rough key frames based on the storyboards and assets
                                </li>
                                <li>
                                    Review and edit the AI-generated key frames to ensure they
                                    meet the desired quality and style
                                </li>
                            </ul>
                        </li>
                        <li>
                            Refinement:
                            <ul>
                                <li>
                                    Use traditional animation techniques to refine and polish the
                                    AI-generated key frames
                                </li>
                                <li>
                                    Incorporate any additional details, such as facial
                                    expressions, body language, and camera movements
                                </li>
                            </ul>
                        </li>
                        <li>
                            Final Preparation:
                            <ul>
                                <li>
                                    Integrate the final key frames into the animation pipeline
                                </li>
                                <li>
                                    Conduct final quality control checks to ensure the key frames
                                    are ready for use in the animation process
                                </li>
                            </ul>
                        </li>
                        <li>
                            Animation process:
                            <ul>
                                <li>
                                    Use animators and AI to fill in the frames in between key
                                    frames
                                </li>
                                <li>
                                    Begin to incorporate voice acting, score, and sound effects
                                    into the animation
                                </li>
                                <li>
                                    Review and make changes to the animation and sound design as
                                    necessary
                                </li>
                            </ul>
                        </li>
                        <li>
                            Continuous marketing and community building:
                            <ul>
                                <li>
                                    We ask everyone to be continuous ambassadors of the project.
                                    Invite others to join the community, and help spread the word
                                    of our movie!
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Aside>

                <Section index={5}>
                    <Card>
                        <h2>Release movie and distribute royalties</h2>
                        <p>
                            We will hold a digital and in-person premiere, then release the
                            movie to be rented and streamed on ArtBot.tv
                        </p>
                        <Button toggle="#learnmore-shares" className="btn-text-dark">
                            Learn More
                        </Button>
                    </Card>
                </Section>
                <Aside id="learnmore-shares">
                    <h2>Shares</h2>
                    <ul className="modal-list">
                        <li>Backers: 50%</li>
                        <li>Producer tier backers: 20% (I’m debating this as an option)</li>
                        <li>Cast and crew: 30%</li>
                    </ul>
                </Aside>
            </SectionWrapper>
        );
    }

    private scrollToFirstSection(): any {
        let firstSection = $('.sectionwrapper').find('.section:not(.hero)');
        if (firstSection.length) {
            Helpers.scrollTo(firstSection);
        }
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
