import {ratioResize} from "Helpers";
import React         from "react";

class Video extends React.Component<any> {

    ratioResize = (element: any) => {
        ratioResize(element, 16, 9);
    };

    render() {
        return (
            <iframe title="Video" className="video youtube" src={this.props.src} ref={this.ratioResize} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        );
    }
}

export default Video;