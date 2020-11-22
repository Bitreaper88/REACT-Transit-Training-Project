import React, { useEffect, useState } from 'react';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';
import { TransitMode, ModeIcon, ModeHover } from './TransitTypes';

/** List of transport modes that can be toggled on or off. */
export const Selectable = [
    'AIRPLANE',
    // 'BICYCLE',
    'BUS',
    'CABLE_CAR',
    // 'CAR',
    'FERRY',
    // 'FUNICULAR',
    // 'GONDOLA',
    'RAIL',
    'SUBWAY',
    // 'TRAM',
    // 'WALK' // Requires special treatment: prioritize no walk
] as const;

export interface ITransProps {
    onChange: (selected: TransitMode[]) => void;
}

export default function TransportModes(props: ITransProps): JSX.Element {
    const [selected, setSelected] = useState<TransitMode[]>([...Selectable]);

    useEffect(() => {
        const fullSelection = [...selected, 'WALK'] as TransitMode[];
        if (selected.includes('CABLE_CAR')) fullSelection.push('TRAM', 'FUNICULAR');
        props.onChange(fullSelection);
    }, [selected]);

    function onButtonClick(mode: TransitMode) {
        if (selected.includes(mode)) {
            setSelected(selected.filter(selected => {
                return selected !== mode;
            }));
        }
        else setSelected([...selected, mode]);
    }

    function buttons() {
        return Selectable.map((mode) => {
            return (
                <TransportButton
                    key={mode}
                    mode={mode}
                    selected={selected.includes(mode)}
                    onClick={onButtonClick} />
            );
        });
    }

    return (
        <div className=''>
            {buttons()}
        </div>
    );
}

interface IButtonProps {
    selected: boolean;
    mode: TransitMode;
    onClick: (mode: TransitMode) => void;
}

export function TransportButton(props: IButtonProps): JSX.Element {
    const [mutableStyles, setMutableStyles] = useState<string>('text-blue-500');

    useEffect(() => {
        if (props.selected) {
            setMutableStyles('text-blue-500');
        }
        else setMutableStyles('text-gray-500');
    }, [props.selected]);

    return (
        <button
            onClick={() => props.onClick(props.mode)}
            className={`material-icons focus:outline-none ${mutableStyles}`}
            title={ModeHover[props.mode]}>
            {ModeIcon[props.mode]}
        </button>
    );
}