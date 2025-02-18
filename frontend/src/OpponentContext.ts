import { createContext } from "react";
import { GameSummary } from "./models";

export const OpponentContext = createContext<GameSummary>([]);
