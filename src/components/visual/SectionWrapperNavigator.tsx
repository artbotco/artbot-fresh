import {faHouse}         from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import $                 from "jquery";
import React             from "react";
import "./SectionWrapperNavigator.scss";
import Helpers           from "../../Helpers";

class SectionWrapperNavigator extends React.Component<any> {

    scrollToSection = (num: number) => {
        let section = $('.section[data-section="' + num + '"]');
        Helpers.scrollTo(section, undefined, () => {
            $('[data-section].active').removeClass('active');
            section.addClass('active');
        });
    }
    getNavigatorItem(num: number) {
        if (num === 0) {
            return (
                <li key={"navigator-item-" + num} className="section-navigator-item" data-section={num} onClick={() => this.scrollToSection(num)}>
                    <FontAwesomeIcon icon={faHouse} />
                </li>
            );
        }
        return (
            <li key={"navigator-item-" + num} className="section-navigator-item" data-section={num} onClick={() => this.scrollToSection(num)}>
                &nbsp;
            </li>
        );
    }

    getItems() {
        let items = [];
        for (let i = 0; i < this.props.indexes.length; i++) {
            items.push(this.getNavigatorItem(i));
        }
        return items;
    }

    render() {
        return (
            <ul className="section-navigator">
                {this.getItems()}
            </ul>
        );
    }
}

export default SectionWrapperNavigator;