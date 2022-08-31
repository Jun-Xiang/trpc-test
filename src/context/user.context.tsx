import { AppRouter } from "@/backend/route/app.router";
import { inferProcedureOutput } from "@trpc/server";
import { createContext, PropsWithChildren, useContext } from "react";

type TQuery = keyof AppRouter["_def"]["queries"];
type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
	AppRouter["_def"]["queries"][TRouteKey]
>;

const UserContext = createContext<InferQueryOutput<"users.me">>(null);

function UserContextProvider({
	children,
	value,
}: PropsWithChildren & { value: InferQueryOutput<"users.me"> | undefined }) {
	return (
		<UserContext.Provider value={value || null}>
			{children}
		</UserContext.Provider>
	);
}

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
