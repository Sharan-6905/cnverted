// Backend the homepage widget calls. The dev deployment (dev.cnvrted.com) sets
// NEXT_PUBLIC_API_URL to the dev API; production falls back to api.cnvrted.com.
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.cnvrted.com";
