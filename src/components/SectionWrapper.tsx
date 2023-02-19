import {Component}             from "react";
import Helpers                 from "../Helpers";
import "./SectionWrapper.scss";
import Section                 from "./Section";
import SectionWrapperNavigator from "./SectionWrapperNavigator";

class SectionWrapper extends Component<any> {
    windowScroll = () => {
        // Scroll handler for mountain background
        const scroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollPercent = scroll / (bodyHeight - windowHeight);
        const offset = 70 - (45 * scrollPercent);
        const sectionWrapper = document.querySelector<HTMLElement>(".sectionwrapper");
        if (sectionWrapper) {
            sectionWrapper.style.backgroundPositionY = `${offset}vh`;
        }
    };

    renderNavigator() {
        let indexes: any[] = [];
        this.props.children.forEach((child: any) => {
           if(child.type === Section && child.props.index !== undefined) {
               indexes.push(child.props.index);
           }
        });
        return (
            <SectionWrapperNavigator indexes={indexes} />
        );
    }
    render() {
        window.addEventListener("scroll", this.windowScroll);
        return (
            <div className={Helpers.getClasses("sectionwrapper", this.props.className)}>
                {this.props.children}
                {this.renderNavigator()}
            </div>
        );
    }
}

export default SectionWrapper;