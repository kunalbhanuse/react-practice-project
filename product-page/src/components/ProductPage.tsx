import { useEffect, useState } from "react";
import axios from "axios";
import "./productPage.css";

function ProductPage() {
  type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    images: string[];
  };
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const featchProduct = async () => {
      const res = await axios.get(
        "https://api.freeapi.app/api/v1/public/randomproducts",
      );
      setProduct(res.data.data.data);
    };
    featchProduct();
    console.log("Array : -", product);
  }, []);
  return (
    <div className="wrapper">
      <h1 className="title">Product Store</h1>

      <div className="container">
        {product.map((p) => (
          <div className="card" key={p.id}>
            <div className="imageBox">
              <img src={p.images?.[0]} alt={p.title} />
            </div>

            <div className="content">
              <h2>{p.title}</h2>
              <p className="desc">{p.description}</p>

              <div className="meta">
                <span>⭐ {p.rating}</span>
                <span>🏷️ {p.brand}</span>
              </div>

              <div className="price">
                <span>₹{p.price}</span>
                <small>{p.discountPercentage}% off</small>
              </div>

              <button>View Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
