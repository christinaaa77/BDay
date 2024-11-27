import React, { useEffect } from 'react';
import './bd.css'; // Path to your CSS file
import birthdayImage from '../../images/hbd.png'; // Path to Happy Birthday image
import newImage from '../../images/bggj.png'; // Path to new image

const BirthdayMessage = () => {
  useEffect(() => {
    const PI2 = Math.PI * 2;
    const random = (min, max) => Math.random() * (max - min + 1) + min | 0;
    const timestamp = () => new Date().getTime();

    class Birthday {
      constructor() {
        this.resize();
        this.fireworks = [];
        this.counter = 0;
      }

      resize() {
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;
      }

      onClick(evt) {
        const x = evt.clientX || (evt.touches && evt.touches[0].pageX);
        const y = evt.clientY || (evt.touches && evt.touches[0].pageY);
        const count = random(3, 5);

        for (let i = 0; i < count; i++) {
          this.fireworks.push(
            new Firework(random(0, this.width), this.height, x, y, random(0, 360), random(30, 110))
          );
        }
        this.counter = -1;
      }

      update(delta) {
        ctx.globalCompositeOperation = 'hard-light';
        ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.globalCompositeOperation = 'lighter';
        for (const firework of this.fireworks) {
          firework.update(delta);
        }

        this.counter += delta * 3;
        if (this.counter >= 1) {
          this.fireworks.push(
            new Firework(random(0, this.width), this.height, random(0, this.width), random(0, this.height / 2), random(0, 360), random(30, 110))
          );
          this.counter = 0;
        }

        this.fireworks = this.fireworks.filter((firework) => !firework.dead);
      }
    }

    class Firework {
      constructor(x, y, targetX, targetY, shade, offsprings) {
        this.dead = false;
        this.offsprings = offsprings;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.shade = shade;
        this.history = [];
      }

      update(delta) {
        const xDiff = this.targetX - this.x;
        const yDiff = this.targetY - this.y;

        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
          this.x += xDiff * 2 * delta;
          this.y += yDiff * 2 * delta;

          this.history.push({ x: this.x, y: this.y });

          if (this.history.length > 20) this.history.shift();
        } else {
          if (this.offsprings && !this.madeChilds) {
            const babies = this.offsprings / 2;
            for (let i = 0; i < babies; i++) {
              const targetX =
                this.x + this.offsprings * Math.cos((PI2 * i) / babies) | 0;
              const targetY =
                this.y + this.offsprings * Math.sin((PI2 * i) / babies) | 0;

              birthday.fireworks.push(
                new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
              );
            }
            this.madeChilds = true;
          }
          this.history.shift();
        }

        if (this.history.length === 0) {
          this.dead = true;
        } else {
          for (let i = 0; i < this.history.length; i++) {
            const point = this.history[i];
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1, 0, PI2);
            ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`;
            ctx.fill();
          }
        }
      }
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const birthday = new Birthday();
    document.body.appendChild(canvas);

    window.onresize = () => birthday.resize();
    document.onclick = (event) => birthday.onClick(event);

    let lastTimeStamp = timestamp();

    const frame = () => {
      const newTimeStamp = timestamp();
      const delta = (newTimeStamp - lastTimeStamp) / 1000;
      lastTimeStamp = newTimeStamp;

      birthday.update(delta);
      requestAnimationFrame(frame);
    };

    frame();

    return () => {
      document.body.removeChild(canvas);
    };
  }, []); // Empty dependency array to run once

  return (
    <div className="birthday-container">
      <img src={birthdayImage} alt="Happy Birthday" className="birthday-image" />
      <img src={newImage} alt="New Image" className="new-image-class" />
      <button
        className="cta-button"
        onClick={() => (window.location.href = '/memories')}
      >
        Click Me!
      </button>
    </div>
  );
};

export default BirthdayMessage;
