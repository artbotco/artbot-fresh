import React, {Component} from "react";
import * as THREE         from "three";
import "./StarryNight.scss";

class StarryNight extends Component {
    canvas = React.createRef<HTMLCanvasElement>();
    camera?: THREE.PerspectiveCamera;

    scene?: THREE.Scene;
    stars: THREE.Mesh[] = [];
    renderer?: THREE.WebGLRenderer;

    componentDidMount() {
        if (this.canvas.current) {
            this.bootStarfield();
        }
    }

    bootStarfield() {
        if (!this.canvas.current) {
            return;
        }
        let heroSection = document.querySelector(".section.hero") as HTMLElement;
        if (!heroSection) {
            return;
        }
        let heroHeight = heroSection.offsetHeight;
        let heroWidth = heroSection.offsetWidth;
        this.camera = new THREE.PerspectiveCamera(45, heroWidth / heroHeight, 1, 1000);
        this.camera.position.z = 5;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x140c24);
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.current, antialias: true});
        this.renderer.setSize(heroWidth, heroHeight);

        this.addStars();

        this.renderFrame();
    }

    renderFrame() {
        requestAnimationFrame(this.renderFrame.bind(this));

        if (!this.scene || !this.camera) {
            return;
        }
        this.renderer?.render(this.scene, this.camera);
        this.animateStars();
    }

    animateStars() {
        if (!this.scene) {
            return;
        }
        let heroSection = document.querySelector(".section.hero") as HTMLElement;
        if (!heroSection) {
            return;
        }
        let division = 30;
        let heroHeight = heroSection.offsetHeight;
        if (window.scrollY > 0) {
            division = 30 + 30 * (window.scrollY / heroHeight);

            let opacity = 1 - (window.scrollY / heroHeight);
            // Set canvas opacity
            if (this.canvas.current) {
                this.canvas.current.style.opacity = opacity.toString();
            }
        }
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            star.position.z += i / division;
            if (star.position.z > 1000) {
                star.position.z -= 2000;
            }
        }
    }

    addStars() {
        if (!this.scene) {
            return;
        }
        for (var z = -1000; z < 1000; z += 12) {
            // Make a sphere (exactly the same as before).
            const random = +(Math.random() * 10).toFixed(0);
            let colorValue = null;
            switch (random) {
                case 0:
                case 1:
                case 2:
                case 3:
                    colorValue = 0x8cde0d;
                    break;
                case 4:
                case 5:
                case 6:
                    colorValue = 0x00bfff;
                    break;
                case 7:
                case 8:
                case 9:
                    colorValue = 0x8855f3;
                    break;
                default:
                    colorValue = 0x8cde0d;
                    break;
            }
            var geometry = new THREE.SphereGeometry(0.5, 32, 32);
            let material = new THREE.MeshBasicMaterial({
                color: colorValue
            });
            var sphere = new THREE.Mesh(geometry, material);
            var sphere1 = new THREE.Mesh(geometry, material);

            // This time we give the sphere random x and y positions between -500 and 500
            sphere.position.x = Math.random() * 1000 - 500;
            sphere.position.y = Math.random() * 1000 - 500;

            sphere1.position.x = Math.random() * 1000 - 500;
            sphere1.position.y = Math.random() * 1000 - 500;

            // Then set the z position to where it is in the loop (distance of camera)
            sphere.position.z = z;
            sphere1.position.z = z;

            // scale it up a bit
            sphere.scale.x = sphere.scale.y = 2;
            sphere1.scale.x = sphere1.scale.y = 2;

            //add the sphere to the scene
            this.scene.add(sphere);
            this.scene.add(sphere1);
            //finally push it to the stars array
            this.stars.push(sphere);
            this.stars.push(sphere1);
        }
    }

    componentWillUnmount(): void {
        this.camera = undefined;
    }

    render() {
        return (
            <canvas ref={this.canvas} className={"starry-night"}></canvas>
        );
    }
}

export default StarryNight;