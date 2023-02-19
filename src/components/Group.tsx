import {Component} from "react";

class Group extends Component<any> {
    getSpacing() {
        if (this.props.spacing) {
            return this.props.spacing;
        }
        return "1.5rem";
    }

    getStyle() {
        return {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "auto",
            height: "auto",
            gap: this.getSpacing()
        };
    }

    render() {
        return (
            <div style={this.getStyle()}>
                {this.props.children}
            </div>
        );
    }
}

export default Group;