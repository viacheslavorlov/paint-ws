import {createContext} from 'react';
export interface IColorsContext {
    fill: string;
    stroke: string;
    setFill: (color: string) => void;
    setStroke: (color: string) => void;
    lineWidth: number;
    setLineWidth: (width: number) => void;
}

export const ColorsContext = createContext<IColorsContext | null>(null);
