import { Env, getSponsor, middleware } from "sponsorflare";

export default {
  fetch: async (request: Request, env: Env) => {
    const sponsorflare = await middleware(request, env);
    if (sponsorflare) return sponsorflare;
    const sponsor = await getSponsor(request, env);
    // do something
    return new Response("Your stuff here");
  },
};
