const router = require("express").Router();

const stripe = require("stripe")(
  "sk_test_51K6pejSDRsAax2nYSXTVKM5ErTpPP1YCx9KJjjuznI87bUoeptDnu6z3vFyAfzS2KfHtA5fMoutA9GVcRjcbkAu300MmALBOaE"
);
const baseURL = "http://localhost:3000";
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => {
        const storedItems = item;
        return {
          price_data: {
            currency: "usd",
            unit_amount: storedItems.price * 100,
            product_data: {
              name: storedItems.title,
            },
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${baseURL}/payment/success`,
      cancel_url: `${baseURL}/payment/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/paywithgifts", async (req, res) => {
  const { items } = req.body;
  console.log(line_items);
  res.status(200).json({ msg: "ok" });
});

module.exports = router;
