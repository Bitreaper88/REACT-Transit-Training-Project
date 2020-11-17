import React, { useEffect, useState } from 'react';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

export const AllModes = [
    'AIRPLANE',
    // 'BICYCLE',
    'BUS',
    'CABLE_CAR',
    // 'CAR',
    'FERRY',
    'FUNICULAR',
    // 'GONDOLA',
    'RAIL',
    'SUBWAY',
    'TRAM',
    'WALK' // Requires special treatment: prioritize no walk
] as const;

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

export type Mode = typeof AllModes[number];

export enum ModeIcon {
    'AIRPLANE' = 'flight',
    'BICYCLE' = 'directions_bike',
    'BUS' = 'directions_bus',
    'CABLE_CAR' = 'tram',
    'CAR' = 'directions_car',
    'FERRY' = 'directions_boat',
    'FUNICULAR' = 'tram',
    'GONDOLA' = 'rowing',
    'RAIL' = 'train',
    'SUBWAY' = 'subway',
    'TRAM' = 'tram',
    'WALK' = 'directions_walk'
}

export enum HoverText {
    'AIRPLANE' = 'Airplane',
    'BICYCLE' = 'Bicycle',
    'BUS' = 'Bus',
    'CABLE_CAR' = 'Cable car',
    'CAR' = 'Car',
    'FERRY' = 'Ferry',
    'FUNICULAR' = 'Funicular',
    'GONDOLA' = 'Gondola',
    'RAIL' = 'Train',
    'SUBWAY' = 'Subway',
    'TRAM' = 'Tram',
    'WALK' = 'Walk'
}

export interface ITransProps {
    onChange: (selected: Mode[]) => void;
}

export default function TransportModes(props: ITransProps): JSX.Element {
    const [selected, setSelected] = useState<Mode[]>([...Selectable]);

    useEffect(() => {
        const fullSelection = [...selected, 'WALK'] as Mode[];
        if (selected.includes('CABLE_CAR')) fullSelection.push('TRAM', 'FUNICULAR');
        props.onChange(fullSelection);
    }, [selected]);

    function onButtonClick(mode: Mode) {
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
    mode: Mode;
    onClick: (mode: Mode) => void;
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
            title={HoverText[props.mode]}>
            {ModeIcon[props.mode]}
        </button>
    );
}