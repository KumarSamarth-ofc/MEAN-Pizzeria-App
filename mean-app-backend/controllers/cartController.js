const Cart = require('../models/Cart');


exports.getCart = async (req, res, next) => {
try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.pizzaitems.toppings');
    if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
    await cart.save();
    }
    res.json(cart);
    } catch (err) {
    next(err);
    }
};


exports.addToCart = async (req, res, next) => {
try {
const { pizzaId, toppings, quantity } = req.body;
let cart = await Cart.findOne({ user: req.user.id });
if (!cart) { cart = new Cart({ user: req.user.id, items: [] }); }
// Check if item with same pizza+ toppings exists
const existingItem = cart.items.find(item =>
item.pizza.toString() === pizzaId &&
JSON.stringify(item.toppings.sort()) === JSON.stringify(toppings.sort())
);
if (existingItem) {
existingItem.quantity += quantity;
} else {
cart.items.push({ pizza: pizzaId, toppings, quantity });
}
await cart.save();
res.json(cart);
} catch (err) {
next(err);
}
};


exports.updateCartItem = async (req, res, next) => {
try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    let item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
} catch (err) {
    next(err);
}
};

exports.removeCartItem = async (req, res, next) => {
try {
const { itemId } = req.params;
let cart = await Cart.findOne({ user: req.user.id });
if (!cart) return res.status(404).json({ message: 'Cart not found' });
cart.items.id(itemId).remove();
await cart.save();
res.json(cart);
} catch (err) {
next(err);
}
};


exports.clearCart = async( req,res,next)=>{
    try {
await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

res.json({ message: 'Cart cleared' });


    }catch(e){
        next(e);
    }
}

