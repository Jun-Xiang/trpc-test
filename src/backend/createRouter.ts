import { router } from "@trpc/server";
import { useEffect } from "react";
import superjson from "superjson";
import { Context } from "./createContext";

export function createRouter() {
	return router<Context>().transformer(superjson);
}
