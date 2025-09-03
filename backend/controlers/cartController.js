import CartItem from "../models/CartItem.js";
import User from "../models/user.js";

// --- Cart Controllers ---
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, productName, price, quantity, images } = req.body;

    let existingItem = await CartItem.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json({ message: 'Cart updated', item: existingItem });
    }

    const newItem = new CartItem({
      userId,
      productId,
      productName,
      price,
      quantity: quantity || 1,
      images: images || [],
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added to cart', item: newItem });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCart = async (req, res) => {
 try {
    const userId = req.params.userId;

    // Populate user aur product details
    const items = await CartItem.find({ userId })
      .populate("userId", "name email")        // user ka name aur email
      .populate("productId", "name price images"); // agar productId collection use ho raha ho

    res.status(200).json({ items });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    const item = await CartItem.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.quantity = quantity;
    await item.save();

    res.status(200).json({ message: 'Quantity updated', item });
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await CartItem.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item removed' });
  } catch (err) {
    console.error('Error removing item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// --- Admin Stats Controllers ---
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (err) {
    console.error("Error fetching total users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await CartItem.countDocuments();
    res.status(200).json({ totalOrders });
  } catch (err) {
    console.error("Error fetching total orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// --- Fetch All Orders with User Data ---
export const getAllOrders = async (req, res) => {
  try {
    const orders = await CartItem.find()
      .populate("userId", "name email") // populate user info
      .sort({ createdAt: -1 }); // latest orders first
    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
