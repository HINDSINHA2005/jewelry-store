import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

import localProducts from "../shop/product"; // Your local product.js

export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "dynamic_products"));
    const firebaseProducts = snapshot.docs.map((doc) => ({
      ...doc.data(),
      image: doc.data().imageUrl, // Match local format
    }));

    // Merge and return
    return [...localProducts, ...firebaseProducts];
  } catch (error) {
    console.error("Error fetching products:", error);
    return localProducts; // fallback
  }
};
