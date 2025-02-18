import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { GameData, Letter } from "../models";
import { getBoard } from "../utils/boardUtils";
import { getSocket } from "../socket";

const initialBoardData = getBoard([], '', '')


export function useGameSocket(gameData: GameData | undefined) {
    const socketRef = useRef<Socket | null>(null);
    const [ready, setReady] = useState<boolean>(false);
    const [boardData, setBoardData] = useState<Letter[][]>(initialBoardData);


    useEffect(() => {
        if (gameData) {
            console.log('getSocket effect');
            socketRef.current = getSocket(gameData.id);
            socketRef.current.on('connect', () => {
                console.log('Connected');

            });
            socketRef.current?.on('move', (value: Letter[][]) => {
                setBoardData(value);
            });
            socketRef.current?.on('ready', () => {
                setReady(true);
            });
        }
    }, [gameData]);

    return { socketRef, ready, boardData };
}