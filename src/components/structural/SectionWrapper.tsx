import Section                             from "components/structural/Section";
import SectionWrapperNavigator             from "components/visual/SectionWrapperNavigator";
import {getClasses}                        from "Helpers";
import $                                   from "jquery";
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

    moveMountain(swiper: any, translate: number) {
        if (!this.wrapper.current) {
            return false;
        }
        const scroll = Math.floor(translate * -1);

        if (scroll === this.currentMountainOffset) {
            return false;
        }
        this.currentMountainOffset = scroll;

        const windowHeight = window.innerHeight;
        const bodyHeight = this.wrapper.current.swiper.virtualSize;
        const scrollPercent = scroll / (bodyHeight - windowHeight);
        const offset = 70 - (45 * scrollPercent);
        //console.log("Setting background position", offset);
        const sectionWrapper = document.querySelector<HTMLElement>(".sectionwrapper");
        if (sectionWrapper) {
            sectionWrapper.style.backgroundPositionY = `${offset}vh`;
        }

        return true;
    }

    checkSwiperTranslate(swiper: any, translate: number) {
        if (!this.wrapper.current) {
            return false;
        }
        const scroll = Math.floor(translate * -1);

        if (scroll === this.currentMountainOffset) {
            return false;
        }

        $(window).trigger("swiperTranslate", [swiper, translate]);
        return true;
    }

    componentDidMount() {
        this.currentMountainOffset = 0;

        this.wrapper.current.swiper.on("setTranslate", (swiper: any, translate: number) => {
            this.checkSwiperTranslate(swiper, translate);
        });
        $(window).on("swiperTranslate", (event: any, swiper: any, translate: number) => {
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
        $(window).off("swiperTranslate");
    }

    render() {
        let key = 0;
        let self = this;
        return (
            <>
                <div className={getClasses("sectionwrapper", this.props.className)}>
                    <Swiper
                        className={this.props.className}
                        direction={"vertical"}
                        pagination={{
                            clickable: true,
                            el: "ul.section-navigator",
                            renderBullet: this.renderBullet
                        }}
                        slidesPerView={1}
                        ref={this.wrapper}
                        watchSlidesProgress={true}
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
                    {this.renderNavigator()}
                </div>
                <></>
            </>
        );
    }

    renderBullet = (index: number, className: string) => {
        return (
            <li key={index} className={className}>
                <a href={`#section-${index}`}>{index}</a>
            </li>
        );
    };
}

export default SectionWrapper;