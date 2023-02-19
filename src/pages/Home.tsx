import Page from "../Page";
import "./Home.scss";
import React from "react";
import Section from "../components/Section";
import SectionWrapper from "../components/SectionWrapper";
import {Card, LearnMore} from "../components/Card";
import Button from "../components/Button";
import Tower from '../assets/tower.png';

class HomeContent extends React.Component {

    towerScroll = () => {
        const tower = document.querySelector<HTMLElement>('.tower');
        if(!tower) {
            return;
        }
        const towerStart = document.querySelector<HTMLElement>('.tower-start');
        if(!towerStart) {
            return;
        }

        const towerStartTop = towerStart.offsetTop;
        const bodyHeight = document.body.clientHeight;
        const scrollRange = bodyHeight - window.innerHeight - towerStartTop;

        const windowScroll = window.scrollY - towerStartTop;
        const towerHeight = tower.clientHeight;
        const baseOffset = window.innerHeight + (window.innerHeight * 0.3);

        if(windowScroll < 0) {
            tower.style.top = `${baseOffset}px`;
            return;
        }

        const maxOffset = bodyHeight - towerHeight - (window.innerHeight * 0.3);
        const offsetRange = maxOffset - baseOffset;
        const windowOffsetPercentage = windowScroll / scrollRange;

        const offset = baseOffset + (offsetRange * windowOffsetPercentage);
        tower.style.top = `${offset}px`;
    }

    render() {
        window.addEventListener('scroll', this.towerScroll);
        return (
            <SectionWrapper>
                <Section className="hero">
                    <h1>Let's Make a Movie!</h1>
                    <h2>Vote on every step of the movie making process, and earn money as the movie does!</h2>
                    {/*<Videos />*/}
                </Section>
                <img src={Tower} className="tower" alt="tower" />
                <Section className="tower-start">
                    <Card>
                        <h2>Vote for your favorite movie idea</h2>
                        <p>We’re starting off with 4 animated movie ideas. Vote for your favorite idea, and once we reach 1,500 votes, we will have selected our movie idea!</p>
                        <Button className="toggle-learn-more btn-text-dark">Learn More</Button>
                        <LearnMore>
                            <h2>Projects</h2>
                            <ul>
                                <li>
                                    The Birth of IO the Artbot
                                    <ul>
                                        <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                                    </ul>
                                </li>
                            </ul>
                        </LearnMore>
                    </Card>
                </Section>
                <Section>
                    <Card>
                        <h2>Support the process</h2>
                        <p>Help crowdfund the movie. Back the production at any level you feel comfortable. Different tiers have different benefits.</p>
                        <Button className="toggle-learn-more btn-text-dark">Learn More</Button>
                        <LearnMore>
                            <h2>Projects</h2>
                            <ul>
                                <li>
                                    The Birth of IO the Artbot
                                    <ul>
                                        <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                                    </ul>
                                </li>
                            </ul>
                        </LearnMore>
                    </Card>
                </Section>
                <Section>
                    <Card>
                        <h2>Collaborate with the community</h2>
                        <p>Vote on every step of the movie making process. Vote on script ideas or join the writing room and help write the script. Help create concept art to show your own vision for the movie. You can create from your own hand or use Midjourney to create AI concept art.</p>
                        <Button className="toggle-learn-more btn-text-dark">Learn More</Button>
                        <LearnMore>
                            <h2>Projects</h2>
                            <ul>
                                <li>
                                    The Birth of IO the Artbot
                                    <ul>
                                        <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                                    </ul>
                                </li>
                            </ul>
                        </LearnMore>
                    </Card>
                </Section>
                <Section>
                    <Card>
                        <h2>Let’s make our movie</h2>
                        <p>Production begins! Give feedback to the voice actors, animators, and help spread the word.</p>
                        <Button className="toggle-learn-more btn-text-dark">Learn More</Button>
                        <LearnMore>
                            <h2>Projects</h2>
                            <ul>
                                <li>
                                    The Birth of IO the Artbot
                                    <ul>
                                        <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                                    </ul>
                                </li>
                            </ul>
                        </LearnMore>
                    </Card>
                </Section>
                <Section>
                    <Card>
                        <h2>Release movie and distribute royalties</h2>
                        <p>We will hold a digital and in-person premiere, then release the movie to be rented and streamed on ArtBot.tv</p>
                        <Button className="toggle-learn-more btn-text-dark">Learn More</Button>
                        <LearnMore>
                            <h2>Projects</h2>
                            <ul>
                                <li>
                                    The Birth of IO the Artbot
                                    <ul>
                                        <li>A sentient robot, born of two junkyard robots, travels to earth after being inspired by movies, and helps a girl save her apartment building by putting on a great show.</li>
                                    </ul>
                                </li>
                            </ul>
                        </LearnMore>
                    </Card>
                </Section>
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
