import { useState, useEffect } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";


export default function MainRouter(props) {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return <Routes>
        <Route path="/" exact element={<HomePage
            onAdd={(products) => { props.onAdd(products) }}
            onRemove={(products) => { props.onRemove(products) }} />} />
        <Route path="home" element={<HomePage
            onAdd={(products) => { props.onAdd(products) }}
            onRemove={(products) => { props.onRemove(products) }} />} />
        <Route path="login" element={<Login />} />
        <Route
            path="*"
            element={
                <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                </main>
            }
        />

    </Routes>

}