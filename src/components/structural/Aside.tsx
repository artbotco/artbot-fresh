import {faTimes}         from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button            from "components/visual/Button";
import Helpers           from "Helpers";
import $                 from "jquery";
import React             from "react";
import "./Aside.scss";

class Aside extends React.Component<any> {

    name = 'aside';
    element = 'aside';
    getClasses() {
        let classes = [];
        if (this.props.className) {
            classes.push(this.props.className);
        }
        if (this.props.id) {
            classes.push(this.props.id);
        }
        if (this.props.side) {
            classes.push(this.name + "-" + (this.props.side === "left" ? "left" : "right"));
        } else {
            classes.push(this.name + "-right");
        }
        return classes;
    }

    protected registerCloseHandler(element: HTMLElement) {
        document.addEventListener("click", (event) => {
            // Check if document contains element with active class
            let el = $(this.element + `#${this.props.id}`);
            let target = $(event.target as Node);
            if (target && target.attr("data-toggle") === `#${this.props.id}`) {
                return;
            }
            let parentToggle = target.closest("[data-toggle]");
            if (parentToggle.length && parentToggle.attr("data-toggle") === `#${this.props.id}`) {
                return;
            }
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
            <aside id={this.props.id} ref={this.registerCloseHandler} className={Helpers.getClasses(this.name, this.getClasses())}>
                <Button color="light" size="xl" toggle={`#${this.props.id}`} className={Helpers.getClasses("btn-content-only",this.name+"-close")}><FontAwesomeIcon icon={faTimes} /></Button>
                {this.props.children}
            </aside>
        );
    }
}

export default Aside;