import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HM/Home';
import BirthdayMessage from './components/BD/BirthdayMessage';
import Memories from './components/Memories';
import Surprise from './components/Surprise';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/birthday-message" element={<BirthdayMessage />} />
                <Route path="/memories" element={<Memories />} />
                <Route path="/surprise" element={<Surprise />} />
            </Routes>
        </Router>
    );
}

export default App;