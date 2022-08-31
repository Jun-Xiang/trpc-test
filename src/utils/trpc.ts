import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "@/backend/route/app.router";

export const trpc = createReactQueryHooks<AppRouter>();
