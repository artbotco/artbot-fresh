import towerImage           from "assets/tower.png";
import $                    from "jquery";
import React                from "react";
import {getSwiperTranslate} from "../../Helpers";
import "./Tower.scss";

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

        let sectionWrapper: any = document.querySelector(".sectionwrapper");
        if (!sectionWrapper) {
            return;
        }
        let offsetTop = sectionWrapper.offsetTop; // Header height

        let swiper: any = document.querySelector(".swiper");
        if (!swiper) {
            return;
        }
        let swiperHeight = swiper?.swiper.virtualSize;
        if (!swiperHeight) {
            return;
        }

        let windowHeight = swiper.clientHeight; // Actual window height minus header
        const towerStartTop = towerStart.offsetTop; // Start offset of tower (second slide) from top of slider
        const scrollRange = swiperHeight - windowHeight - towerStartTop; // We only slide the height of the swiper until the bottom hits the end, and we subtract the slider starting position

        const windowScroll = getSwiperTranslate() - towerStartTop; // Current scroll position of the slider minus the starting position of the tower

        if(windowScroll < 0) {
            tower.style.top = `${windowHeight * 2}px`;
            return;
        }

        let shifts = [
            0,
            0.1,
            0,
            0,
            0
        ];
        let slide = Math.floor(getSwiperTranslate() / windowHeight) - 1;
        let extraOffset = 0;
        if(shifts[slide]) {
            extraOffset = shifts[slide];
        }

        const towerHeight = tower.clientHeight - (windowHeight * 0.6); // Actual height of the tower as rendered

        const baseOffset = offsetTop + (windowHeight * 0.3); // We want to offset by header height + a third of VH

        //const maxOffset = swiperHeight - towerHeight - windowHeight * 0.3;
        //const offsetRange = maxOffset - baseOffset;
        const windowOffsetPercentage = windowScroll / scrollRange;

        const offset = baseOffset - (towerHeight * windowOffsetPercentage) + (windowHeight * extraOffset);

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