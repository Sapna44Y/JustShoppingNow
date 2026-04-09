// import stripe from "stripe";

// const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

// export default Stripe;

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
