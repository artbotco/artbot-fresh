import {faTimes}         from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Helpers           from "Helpers";
import $                 from "jquery";
import React             from "react";
import Button            from "components/visual/Button";
import "./Aside.scss";

class Aside extends React.Component<any> {

    getClasses() {
        let classes = [];
        if (this.props.className) {
            classes.push(this.props.className);
        }
        return classes;
    }

    registerCloseHandler = (element: HTMLElement) => {
        document.addEventListener("click", (event) => {
            // Check if document contains element with active class
            let el = $(`#${this.props.id}`);
            if (el.hasClass("active")) {
                // Check if clicked element is not inside the aside
                if (!el[0].contains(event.target as Node)) {
                    el.removeClass("active");
                }
            }
        });
    };

    render() {
        return (
            <aside id={this.props.id} ref={this.registerCloseHandler} className={Helpers.getClasses("aside", "aside-" + this.props.side ?? "right", this.getClasses())}>
                <Button color="light" size="xl" toggle={`#${this.props.id}`} className="btn-content-only aside-close"><FontAwesomeIcon icon={faTimes} /></Button>
                <h1>Aside</h1>
            </aside>
        );
    }
}

export default Aside;