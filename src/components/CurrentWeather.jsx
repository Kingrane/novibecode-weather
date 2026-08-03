import React from 'react';

const CurrentWeather = ({temp, coords, text, city}) => {

    return (
        <div className="flex flex-col items-center justify-center py-12 gap-1">
            <h3 className="font-[Montserrat] text-4xl lg:text-8xl">{city}</h3>
            <p className="font-[Nunito] text-white/60 lg:text-xl">{text}</p>
            <h2 className="font-[Montserrat] text-6xl lg:text-8xl text-center">{temp}°</h2>
            <p className="font-[Nunito] text-white/60 lg:text-xl">{coords}</p>
        </div>
    );
};

export default CurrentWeather;