import React, {useState} from 'react';
import './style.css'
function SwitchButton({ collapsed, headerTab }) {
    const [selected, setSelected] = useState('second')
    return (
        <div role="radiogroup" className={`opacity-100 ${!collapsed ? 'theme-switcher-collapsed' : 'theme-switcher-expand'}` }>
            <button
                type="radio"
                role="radio"
                data-theme-switcher="true"
                className={`theme-switcher_switch ${selected === 'first' ? 'active' : ''} ${collapsed ? `collapsed` : `expand`}` }
                aria-label="Switch to light theme"
                aria-checked="false"
                onClick={() => setSelected('first')}
            >
                <img src="/assets/icons/ic_major_game.svg" alt=""/>{collapsed ? headerTab[0] : ''}
            </button>
            <button
                type="radio"
                role="radio"
                data-theme-switcher="true"
                className={`theme-switcher_switch ${selected === 'second' ? 'active' : ''} ${collapsed ? `collapsed` : `expand`}`}
                aria-label="Switch to system theme"
                aria-checked="false"
                onClick={() => setSelected('second')}

            >
                <img src="/assets/icons/ic_match_game.svg" alt=""/>{collapsed ? headerTab[1] : ''}
            </button>
        </div>

    )
}
export default SwitchButton;

