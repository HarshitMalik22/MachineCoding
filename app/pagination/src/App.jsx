import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if(selectedPage >= 1 &&
      selectedPage <= products.length/10 &&
      selectedPage !== page) 
    setPage(selectedPage)
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(0, page*10).map((prod) => {
            return(
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
          );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className ="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick= {() => selectPageHandler(page-1)}>⬅️</span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
            <span
            className={page === i+1? "pagination__selected" : ""} 
            onClick= {() => selectPageHandler(i+1)}
            key={i}>
              {i+1}
            </span>
            );
          })}
          <span
            onClick= {() => selectPageHandler(page+1)}
            className={page < products.length/10 ? "" : "pagination__disable"} >➡️</span>
        </div>
      )}
    </div>
  );
}
