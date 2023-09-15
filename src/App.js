import './App.css';
import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import React from "react";
import TripsPage from "./components/TripsPage";
import TripPage from "./components/TripPage";
import BottomBar from "./components/BottomBar/BottomBar";
import TopNav from "./components/TopNav/TopNav";
import HomePage from "./components/HomePage/HomePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import MapPage from "./components/MapPage/MapPage";
import SearchPage from "./components/SearchPage/SearchPage";
import LoginPage from "./components/LoginPage/LoginPage";


function App() {
    const token = localStorage.getItem('token');
    return (
        <div className="App">
            <HashRouter>
                <div className="App__content">
                    <TopNav />
                    {token ? (
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/trips" element={<TripsPage />} />
                            <Route path="/trip" element={<TripPage />} />
                            <Route path="/friends" element={<FriendsPage />} />
                            <Route path="/map" element={<MapPage />} />
                            <Route path="/search" element={<SearchPage />} />
                        </Routes>
                        ) : (
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/trips" element={<LoginPage />} />
                            <Route path="/friends" element={<LoginPage />} />
                            <Route path="/map" element={<LoginPage />} />
                            <Route path="/search" element={<LoginPage />} />
                        </Routes>
                    )}
                </div>
                <BottomBar />
            </HashRouter>
        </div>

    );
}

export default App;
