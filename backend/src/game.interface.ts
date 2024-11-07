export interface Game {
    id: string;
    created: Date;
    word: string;
    ended?: Date;
    players: string[];
}