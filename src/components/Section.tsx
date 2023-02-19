import {Component} from "react";
import './Section.scss';
import Helpers from "../Helpers";

class Section extends Component<any> {
    render() {
        return (
            <div className={Helpers.getClasses('section', this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

export default Section;