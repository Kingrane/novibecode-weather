import React from 'react';
import {Sun, CloudSun, Cloud, CloudRain, CloudLightning, Snowflake, CalendarDays, Droplet, CloudFog} from 'lucide-react';

const Forecast = ({days}) => {
    function CodeToIcon(code) {
        if (code === 0)
            return Sun;
        if (code === 1 || code === 2)
            return CloudSun;
        if (code === 3)
            return Cloud;
        if ([45, 48].includes(code))
            return CloudFog;
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
            return CloudRain;
        if ([71, 73, 75, 77, 85, 86].includes(code))
            return Snowflake;
        if ([95, 96, 99].includes(code))
            return CloudLightning;
        return CloudSun;
    }

    function formatDay(dateStr, index) {
        if (index === 0) return 'Сегодня';
        return new Date(dateStr).toLocaleDateString('ru-RU', { weekday: 'long' });
    }
    return (
        <div className="px-7 py-6 lg:py-12 hover:scale-102">
            <div className="mx-6 p-5 bg-neutral-400/30 border border-white/15 rounded-2xl backdrop-blur-2xl saturate-120"
                 style={{
                     boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.4),
                        inset 0 20px 40px rgba(255,255,255,0.08),
                        0 25px 50px rgba(0,0,0,0.3)
                    `
                 }}>
                <div
                    className="flex items-center gap-2 text-white/70 text-sm font-medium uppercase tracking-wider mb-4">
                    <CalendarDays className="w-5 h-5 lg:w-7 lg:h-7"/>
                    <span>Прогноз на 7 дней</span>
                </div>

                <div className="flex flex-col">
                    {days.map((item, index) => {
                        const Icon = CodeToIcon(item.code);
                        const day = formatDay(item.date, index);
                        return (
                            <div key={index} className="flex items-center justify-between py-3 lg:py-6 lg:text-xl border-b-2 border-white/15 last:border-b-0">
                                <span className="text-white font-medium w-24 capitalize">{day}</span>

                                <div className="flex items-center gap-2">
                                    <Icon className="w-6 h-6 text-white lg:w-8 lg:h-8"/>
                                    <div className="flex items-center gap-1 text-white/60 text-xs lg:text-xl">
                                        <Droplet className="w-3 h-3 lg:w-5 lg:h-5"/>
                                        <span>{item.humidity}%</span>
                                    </div>
                                </div>


                                <div className="flex items-center gap-3 w-16 justify-end">
                                    <span className="text-white font-bold">{item.max}°</span>
                                    <span className="text-white/50">{item.min}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Forecast;