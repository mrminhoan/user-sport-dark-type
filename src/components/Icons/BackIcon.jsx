import React from 'react'
import Icon from "@ant-design/icons";

function BackIcon(props) {
    return (
        <Icon
            component={() => (
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14"  fill="currentColor">
                    <path d="M1.90667 6.99992L7.45333 12.5199C7.72 12.7866 7.72 13.1999 7.45333 13.4666C7.18667 13.7333 6.77333 13.7333 6.50667 13.4666L0 6.99992L6.50667 0.533252C6.77333 0.266585 7.2 0.266585 7.45333 0.533252C7.72 0.799919 7.72 1.22659 7.45333 1.47992L1.90667 6.99992Z" fill="white" style="fill:white;fill-opacity:1;" />
                </svg>
            )}
            {...props}
        />
    )
}

export default BackIcon
