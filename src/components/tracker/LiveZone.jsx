import React from 'react'
import { FcSportsMode } from "react-icons/fc";
import AmericanFootball from './AmericanFootball';
import Football from './Football';
import BasketBall from './BasketBall';
import Baseball from './Baseball';
import Hockey from './Hockey';
import Volleyball from './Volleyball';

function LiveZone({ fixtureId, sportId }) {
    const renderLive = () => {
        switch (sportId) {
            case 131506:
                return <AmericanFootball fixtureId={fixtureId} />;
            case 6046:
                return <Football fixtureId={fixtureId} />;
            case 48242:
                return <BasketBall fixtureId={fixtureId} />;
            case 154914:
                return <Baseball fixtureId={fixtureId} />;
            case 35232:
                return <Hockey fixtureId={fixtureId} />;
            case 154830:
                return <Volleyball fixtureId={fixtureId} />;
            case 687890:
                return (
                    <div className="flex items-center justify-center w-full">
                        <FcSportsMode className="h-16 w-16 opacity-90" />
                    </div>
                );
            default: <FcSportsMode />
        }
    };
    return (
        renderLive()
    )
}

export default LiveZone
