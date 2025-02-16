import { Env, getSponsor, middleware, SponsorDO } from "sponsorflare";
export { SponsorDO };
export default {
  fetch: async (request: Request, env: Env) => {
    const sponsorflare = await middleware(request, env);
    if (sponsorflare) return sponsorflare;

    const sponsor = await getSponsor(request, env, {
      // charges 1 cent
      charge: 1,
    });

    if (!sponsor.charged) {
      return new Response("Payment required", { status: 402 });
    }

    // do something
    return new Response("Your stuff here");
  },
};
