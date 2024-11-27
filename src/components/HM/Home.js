import React, { useEffect, useState } from 'react';
import jipin from '../../images/jipin.jpg';
import './Home.css';

const Home = () => {
    const birthday = new Date('2024-11-28T00:00:00'); // Ganti sesuai dengan tanggal ulang tahun yang benar
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const distance = birthday - now;

            // Hitung jumlah hari, jam, menit, dan detik
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update state dengan format yang benar
            setTimeLeft({
                days,
                hours: hours < 10 ? `0${hours}` : hours,  // Menambahkan leading zero jika kurang dari 10
                minutes: minutes < 10 ? `0${minutes}` : minutes,  // Menambahkan leading zero jika kurang dari 10
                seconds: seconds < 10 ? `0${seconds}` : seconds,  // Menambahkan leading zero jika kurang dari 10
            });

            // Jika countdown selesai, hentikan interval
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(interval); // Clear interval ketika komponen unmount
    }, [birthday]);

    return (
        <div className="home-page">
            <h1 className="home-title">Hi Jipinnn!</h1>
            <img src={jipin} alt="Birthday" className="home-image" />
            <h2 className="home-subtitle">Countdown to your Birthday:</h2>
            <div className="home-countdown">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
            <button
                className="home-button"
                onClick={() => (window.location.href = '/birthday-message')}
            >
                Ready 💗
            </button>
        </div>
    );
};

export default Home;
