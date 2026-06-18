const FAQ = [
  {
    keywords: ["sell", "selling", "seller", "list item", "scrap"],
    answer:
      "To sell scrap: log in, go to **Sell Items**, add your scrap details (type, weight, price), and submit. Buyers can then send you purchase requests from the marketplace.",
  },
  {
    keywords: ["buy", "buyer", "purchase", "listing", "shop"],
    answer:
      "To buy scrap: register as a Buyer, browse **Listing** to see available scrap, and send a request to sellers. Track incoming deals from your **Dashboard**.",
  },
  {
    keywords: ["inventory", "stock", "manage"],
    answer:
      "Buyers can manage purchased scrap in **Inventory** (open your profile menu). Add, update, or track items you've acquired through the platform.",
  },
  {
    keywords: ["request", "order", "status", "pending"],
    answer:
      "Sellers see buyer requests under **My Requests**. Buyers track incoming offers on **Dashboard**. Accept or reject requests to move deals forward.",
  },
  {
    keywords: ["register", "sign up", "account", "login"],
    answer:
      "Click **Register** in the navbar to create an account. You can sign up as a Buyer, Seller, or both. Use **Login** to access your dashboard.",
  },
  {
    keywords: ["price", "pricing", "cost", "rate"],
    answer:
      "Sellers set their own prices when listing scrap. Buyers compare listings on the marketplace. Pricing is transparent — you see the seller's rate before sending a request.",
  },
  {
    keywords: ["pickup", "delivery", "collect"],
    answer:
      "Pickup and delivery terms are agreed between buyer and seller when a request is accepted. Use the platform to coordinate once a deal is confirmed.",
  },
];

const DEFAULT_REPLY =
  "I'm the Scrap Management assistant. I can help with selling scrap, buying listings, inventory, requests, and account setup. Try asking: \"How do I sell scrap?\" or \"How does buying work?\"";

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ");
}

export function getFallbackReply(message) {
  const normalized = normalize(message);

  for (const entry of FAQ) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.answer;
    }
  }

  return DEFAULT_REPLY;
}

export const QUICK_PROMPTS = [
  "How do I sell scrap?",
  "How do I buy scrap?",
  "What is inventory?",
  "How do requests work?",
];
