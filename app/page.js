"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuid } from "uuid";
import Header from "../components/Header";
import FormComponent from "@/components/FormComponent";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const handleFetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      console.error(err?.message);
      alert(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchProducts();

    return () => {
      setProducts([]);
    };
  }, []);

  useEffect(() => {
    if (search) {
      searchRef.current = search;
    }
  }, [search]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchRef.current}`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (e) {
      console.log(e?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback(async (e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div>
      <Header />
      <FormComponent handleChange={handleChange} handleSubmit={handleSubmit} />
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 m-10">
            {products.map((product) => (
              <ProductCard
                key={uuid()}
                product={product}
                setLoading={setLoading}
                setProducts={setProducts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
