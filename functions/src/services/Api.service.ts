import { Painting } from './../schemas/Paintings.schema';
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-01-27.acacia',
})

export const post = async (items: Painting[], url: string) => {
   try { 
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((painting: Painting) => ({
            price_data: {
                currency: 'eur',
                product_data: {name: painting.name},
                unit_amount: Number(painting.price) * 100
            },
            quantity: 1
        })),
        mode: 'payment',
        success_url: `${url}/cart?payment=success`,
        cancel_url: `${url}/cart?payment=failed`
    })
    return {url: session.url}
} catch (err) {
    console.log(err)

}
}