import $      from "jquery";
import Swiper from "swiper";

export function mergeNonEmpty(...stringsOrArrays: any): any[] {
    let retArr = [] as any[];
    // Go through stringsOrArrays, merge all non-empty
    for (let i = 0; i < stringsOrArrays.length; i++) {
        let item = stringsOrArrays[i];
        if (Array.isArray(item)) {
            retArr = retArr.concat(mergeNonEmpty(...item));
        } else if (typeof item === "string" && item.length > 0) {
            retArr.push(item);
        } else if (typeof item === "number" && !isNaN(item)) {
            retArr.push(item);
        }
    }
    return retArr;
}

export function getClasses(...stringsOrArrays: any[]): string {
    let retArr = [] as string[];
    for (let i = 0; i < stringsOrArrays.length; i++) {
        let item = stringsOrArrays[i];
        if (Array.isArray(item)) {
            retArr = retArr.concat(mergeNonEmpty(...item));
        } else if (typeof item === "string" && item.length > 0) {
            retArr = retArr.concat(mergeNonEmpty(item.split(" ")));
        }
    }
    return retArr.join(" ");
}

export function ratioResize(element: JQuery<HTMLElement> | HTMLElement, wR: number = 16, hR: number = 9) {
    let $element = $(element);
    if (!$element) return;
    let height = $element.height();
    if (!height) {
        return;
    }
    // Get width for 16:9
    let ratio = wR / hR;
    // Set width
    $element.css("width", height * ratio);
}

export function scrollTo(element: JQuery<HTMLElement> | HTMLElement, duration: number = 1000, callback?: () => void) {
    let offsetTop = $(element)[0].offsetTop;
    $("html, body").animate({
        scrollTop: offsetTop
    }, 100, () => {
        if (callback) {
            callback();
        }
    });
}

export function getSwiperTranslate() {
    //.swiper.translate * -1
    let swiper: any = document.querySelector(".swiper");
    if (!swiper) {
        return 0;
    }
    let swiperInstance: Swiper = swiper.swiper;
    if (!swiperInstance) {
        return 0;
    }
    return swiperInstance.translate * -1;
}

export function scrollToSection(num: number) {
    let swiper: any = document.querySelector(".swiper");
    if (!swiper) {
        return false;
    }
    let swiperInstance: Swiper = swiper.swiper;
    if (!swiperInstance) {
        return false;
    }
    swiperInstance.slideTo(num, 1000);
}

export function filterClasses(classes:string, exclude:string[] = []):string {
    let ret = classes.split(" ").filter((c) => {
        console.log(c);
        return exclude.indexOf(c) === -1;
    });
    return ret.join(" ");
}