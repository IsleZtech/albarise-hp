"use client";

import ThreeScene from "../../ThreeScene";
import "../../App.css";


export default function Demo() {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            background: 'transparent'
        }}>
            <ThreeScene />
        </div>
    );
}
