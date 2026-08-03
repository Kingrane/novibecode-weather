import React from 'react';
import { Droplet, Wind, WindArrowDown, Thermometer } from 'lucide-react';

const Details = (props) => {
    return (
        <div className="grid grid-cols-2 gap-4 px-7 lg:grid-cols-4">
            <div className="flex flex-col justify-between items-start p-5 aspect-square bg-neutral-400/30 border-2 border-white/15 rounded-2xl backdrop-blur-2xl saturate-120 hover:scale-103"
                 style={{
                     boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.2),
                        inset 0 20px 40px rgba(255,255,255,0.08),
                        0 15px 20px rgba(0,0,0,0.2)
                    `
                 }}>
                <div className="flex items-center gap-2 text-white/70 text-sm lg:text-lg font-medium uppercase tracking-wider">
                    <Droplet className="w-5 h-5"/>
                    <span>Влажность</span>
                </div>
                <div>
                    <p className="text-3xl lg:text-8xl font-bold text-white">{props.vlaga}</p>
                    <p className="text-white/70 text-sm lg:text-lg mt-1">Сухой воздух</p>
                </div>
            </div>

            <div className="flex flex-col justify-between items-start p-5 aspect-square bg-neutral-400/30 border-2 border-white/15 rounded-2xl backdrop-blur-2xl saturate-120 hover:scale-103"
                 style={{
                     boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.2),
                        inset 0 20px 40px rgba(255,255,255,0.08),
                        0 15px 20px rgba(0,0,0,0.2)
                    `
                 }}>
                <div className="flex items-center gap-2 text-white/70 text-sm lg:text-lg font-medium uppercase tracking-wider">
                    <Wind className="w-5 h-5"/>
                    <span>Ветер</span>
                </div>
                <div>
                    <p className="text-3xl lg:text-8xl font-bold text-white">{props.wind} <span className="text-lg font-normal">км/ч</span></p>
                    <p className="text-white/70 text-sm lg:text-lg mt-1">Лёгкий бриз</p>
                </div>
            </div>

            <div className="flex flex-col justify-between items-start p-5 aspect-square bg-neutral-400/30 border-2 border-white/15 rounded-2xl backdrop-blur-2xl saturate-120 hover:scale-103"
                 style={{
                     boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.2),
                        inset 0 20px 40px rgba(255,255,255,0.08),
                        0 15px 20px rgba(0,0,0,0.2)
                    `
                 }}>
                <div className="flex items-center gap-2 text-white/70 text-sm lg:text-lg font-medium uppercase tracking-wider">
                    <WindArrowDown className="w-5 h-5"/>
                    <span>Давление</span>
                </div>
                <div>
                    <p className="text-3xl lg:text-8xl font-bold text-white">{props.pressure}</p>
                    <p className="text-white/70 text-sm lg:text-lg mt-1">мм рт. ст.</p>
                </div>
            </div>

            <div className="flex flex-col justify-between items-start p-5 aspect-square bg-neutral-400/30 border-2 border-white/15 rounded-2xl backdrop-blur-2xl saturate-120 hover:scale-103"
                 style={{
                     boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.2),
                        inset 0 20px 40px rgba(255,255,255,0.08),
                        0 15px 20px rgba(0,0,0,0.2)
                    `
                 }}>
                <div className="flex items-center gap-2 text-white/70 text-sm lg:text-lg font-medium uppercase tracking-wider">
                    <Thermometer className="w-5 h-5"/>
                    <span>Ощущается</span>
                </div>
                <div>
                    <p className="text-3xl lg:text-8xl font-bold text-white">{props.feels}°</p>
                    <p className="text-white/70 text-sm lg:text-lg mt-1">Жаришка</p>
                </div>
            </div>
        </div>
    );
};

export default Details;