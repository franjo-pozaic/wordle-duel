import { useLoaderData } from "react-router-dom";
import { GameData } from "../models";
import { useEffect, useState } from "react";

export function useGameId() {
    const { gameId } = useLoaderData() as { gameId: string };
    return gameId;
}

export function useGameData(gameId: string) {
    const [gameData, setGameData] = useState<GameData>();
    useEffect(() => {
        if (gameId === 'new') {
            fetch('http://localhost:3000/game', {
                method: 'POST',
                body: JSON.stringify({})
            })
                .then(res => res.json())
                .then(data => setGameData(data));
        } else {
            fetch(`http://localhost:3000/game/${gameId}`, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => setGameData(data));
        }
    }, [gameId]);

    return gameData;
}