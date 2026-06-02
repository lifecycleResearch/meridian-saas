// Stripe client (server-only)
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

export const stripe = key
  ? new Stripe(key, { apiVersion: "2024-11-20.acacia" as any })
  : null;
export const stripeConfigured = Boolean(stripe);

// Restricted key for safe reads (optional)
const rk = process.env.STRIPE_RESTRICTED_KEY || "";
export const stripeRead = rk
  ? new Stripe(rk, { apiVersion: "2024-11-20.acacia" as any })
  : null;
