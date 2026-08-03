import React, {useState} from 'react';
import {MapPin, Settings, Search} from 'lucide-react';

const Header = ({onSearch}) => {
    const [input, setInput] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input);
        setInput('');
    };

    return (
        <header
            className="font-[Nunito] flex px-5 py-4 bg-neutral-400/30  border-b-2 border-white/15 backdrop-blur-2xl saturate-120 justify-between gap-6"
            style={{
                boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.2),
                        inset 0 20px 40px rgba(255,255,255,0.08),
                        0 15px 20px rgba(0,0,0,0.2)
                    `
            }}>
            <div className="relative w-full max-w-md lg:max-w-5xl flex justify-between items-center">
                <p className="hidden lg:block lg:px-6 text-4xl w-full text-nowrap">Ромина погодка</p>
                <form onSubmit={handleSubmit} className="relative w-full max-w-md lg:max-w-xl">
                    <input value={input}
                           className="w-full  pl-4 pr-4 py-3 text-sm border-2 bg-white/0  border-b-2 border-white/15 backdrop-blur-2xl saturate-120 rounded-4xl outline-none focus:outline-none hover:shadow-xl"
                           type="text"
                           placeholder="Поиск города"
                           onChange={(e) => setInput(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   e.preventDefault();
                                   handleSubmit(e);
                               }
                           }}
                    />
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none">
                        <Search className="w-5 h-5 text-white/60"/>
                    </button>
                </form>
            </div>
            <div className="flex gap-4">
                <button type="button" className="bg-transparent border-none hover:scale-110 hover:rotate-5"><MapPin/></button>
                <button type="button" className="bg-transparent border-none hover:scale-110 hover:rotate-5"><Settings/></button>
            </div>
        </header>
    );
};

export default Header;