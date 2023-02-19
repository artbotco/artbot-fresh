import {Component} from "react";
import './SectionWrapper.scss';
import Helpers from "../Helpers";

class SectionWrapper extends Component<any> {
    windowScroll = () => {
        const scroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollPercent = scroll / (bodyHeight - windowHeight);
        const offset = 70 - (45 * scrollPercent);
        const sectionWrapper = document.querySelector<HTMLElement>('.sectionwrapper');
        if (sectionWrapper) {
            sectionWrapper.style.backgroundPositionY = `${offset}vh`;
        } else {
            console.log('sectionWrapper not found');
        }
    }
    render() {
        window.addEventListener('scroll', this.windowScroll);
        return (
            <div className={Helpers.getClasses('sectionwrapper', this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

export default SectionWrapper;