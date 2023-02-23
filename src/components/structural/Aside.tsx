import {faTimes}         from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button            from "components/visual/Button";
import {getClasses}           from "Helpers";
import $                 from "jquery";
import React             from "react";
import "./Aside.scss";

class Aside extends React.Component<any> {

    name = "aside";
    element = "aside";

    ref:any = React.createRef();

    state = {
        active: false
    };

    constructor(props: any, state: any) {
        super(props);
    }

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
        if (this.state.active) {
            classes.push("active");
        }
        return classes;
    }

    public componentDidMount() {
        let element = this.ref.current;
        if(!element) {
            return;
        }
        $(element).on("toggle", () => {this.toggleState();});
    }

    public toggleState() {
        if (this.state.active) {
            this.setState({active: false});
        } else {
            this.setState({active: true});
            $('aside.active:not(#' + this.props.id + ')').trigger("toggle");
        }
    }

    public componentWillUnmount() {
        let element = this.ref.current;
        if(!element) {
            return;
        }
        $(element).off("toggle");
    }

    render() {
        return (
            <aside id={this.props.id} ref={this.ref} className={getClasses(this.name, this.getClasses())}>
                <Button color="light" size="xl" toggle={`#${this.props.id}`} className={getClasses("btn-content-only", this.name + "-close")}><FontAwesomeIcon icon={faTimes} /></Button>
                {this.props.children}
            </aside>
        );
    }
}

export default Aside;