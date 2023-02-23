import towerImage           from "assets/tower.png";
import $                    from "jquery";
import React                from "react";
import {getSwiperTranslate} from "../../Helpers";

class Tower extends React.Component {

    towerScroll = () => {
        const tower = document.querySelector<HTMLElement>(".tower");
        if (!tower) {
            return;
        }
        let towerStart = document.querySelector<HTMLElement>(".tower-start");
        if (!towerStart) {
            return;
        }
        towerStart = towerStart.parentNode as HTMLElement;
        if (!towerStart) {
            return;
        }

        let swiper: any = document.querySelector(".swiper");
        if (!swiper) {
            return;
        }
        let swiperHeight = swiper?.swiper.virtualSize;
        if (!swiperHeight) {
            return;
        }

        const towerStartTop = towerStart.offsetTop;
        const scrollRange = swiperHeight - window.innerHeight - towerStartTop;

        const windowScroll = getSwiperTranslate() - towerStartTop;
        const towerHeight = tower.clientHeight;
        const baseOffset = window.innerHeight * 0.3;

        /*        if (windowScroll < 0) {
                    tower.style.top = `${baseOffset}px`;
                    return;
                }*/

        const maxOffset = swiperHeight - towerHeight - window.innerHeight * 0.3;
        const offsetRange = maxOffset - baseOffset;
        const windowOffsetPercentage = windowScroll / scrollRange;

        const offset = baseOffset + offsetRange * windowOffsetPercentage;


        console.table({towerStartTop, scrollRange, windowScroll, towerHeight, baseOffset, maxOffset, offsetRange, windowOffsetPercentage, offset});

        tower.style.top = `${offset}px`;
    };

    componentDidMount() {
        $(window).on("swiperTranslate", this.towerScroll);
    }

    componentWillUnmount() {
        $(window).off("swiperTranslate", this.towerScroll);
    }

    render() {
        return (
            <img src={towerImage} className="tower" alt="tower" />
        );
    }
}

export default Tower;