import Section                             from "components/structural/Section";
import SectionWrapperNavigator             from "components/visual/SectionWrapperNavigator";
import Helpers                             from "Helpers";
import React, {Component}                  from "react";
import {Mousewheel, Pagination, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {Swiper, SwiperSlide}               from "swiper/react";
import "./SectionWrapper.scss";

class SectionWrapper extends Component<any> {
    wrapper: any = React.createRef();

    currentMountainOffset: number = 0;

    windowScroll = () => {
        // Scroll handler for mountain background
    };

    renderNavigator() {
        let indexes: any[] = [];
        this.props.children.forEach((child: any) => {
            if (child.type === Section && child.props.index !== undefined) {
                indexes.push(child.props.index);
            }
        });
        return (
            <SectionWrapperNavigator indexes={indexes} />
        );
    }

    // @ts-ignore
    moveMountain(swiper: Swiper, translate: number) {
        if (!this.wrapper.current) {
            console.error("No swiper wrapper");
            return false;
        }
        const scroll = Math.floor(translate * -1);

        if (scroll === this.currentMountainOffset || scroll < 1) {
            console.log("No scroll necessary", scroll, this.currentMountainOffset);
            return false;
        }
        console.log("Scrolling", scroll, this.currentMountainOffset);
        this.currentMountainOffset = scroll;

        const windowHeight = window.innerHeight;
        const bodyHeight = this.wrapper.current.swiper.virtualSize;
        const scrollPercent = scroll / (bodyHeight - windowHeight);
        const offset = 70 - (45 * scrollPercent);
        console.log("Setting background position", offset);
        this.wrapper.current.style.backgroundPositionY = `${offset.toFixed()}vh`;

        return true;
    }

    componentDidMount() {
        this.currentMountainOffset = 0;

        this.wrapper.current.swiper.on("setTranslate", (swiper: any, translate: number) => {
            this.moveMountain(swiper, translate);
        });
    }

    componentWillUnmount(): void {
        if (!this.wrapper.current) {
            return;
        }
        if (!this.wrapper.current.swiper) {
            return;
        }
        this.wrapper.current.swiper.off("setTranslate");
    }

    render() {
        let key = 0;
        let self = this;
        return (
            <>
                <Swiper
                    className={Helpers.getClasses("sectionwrapper", this.props.className)}
                    direction={"vertical"}
                    pagination={{
                        clickable: true
                    }}
                    slidesPerView={1}
                    onSwiper={(swiper) => {
                        console.log(swiper);
                    }}
                    ref={this.wrapper}
                    watchSlidesProgress={true}
                    /*onSetTranslate={(swiper, translate) => {
                        self.moveMountain(swiper, translate);
                    }}*/
                    observer={true}
                    observeParents={true}
                    observeSlideChildren={true}
                    scrollbar={{draggable: true}}
                    mousewheel={true}
                    modules={[Pagination, Scrollbar, Mousewheel]}
                >

                    {this.props.children.map((child: any) => {
                        if (child.type === Section) {
                            key++;
                            return (
                                <SwiperSlide key={key}>
                                    {child}
                                </SwiperSlide>
                            );
                        }
                    })}
                </Swiper>
                {/*{this.renderNavigator()}*/}
                <></>
            </>
        );
    }
}

export default SectionWrapper;