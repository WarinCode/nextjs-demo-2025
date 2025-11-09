"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";
import { v4 as uuid } from "uuid";

function formatStars(score) {
  if (!score) score = 0;

  if (score > 5) score = 5;
  if (score < 0) score = 0;

  let stars = "★".repeat(score);
  stars += "☆".repeat(5 - score);

  return stars;
}

export default function ProductDetail({ params }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [isError, setIsError] = useState(false);
  const { id } = use(params);

  useEffect(() => {
    (async function () {
      setLoading(true);

      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();

        if ("message" in data || response.status === 404) {
          throw new Error("Product not found!");
        } else {
          setProduct(data);
        }
      } catch (err) {
        alert(err?.message);
        setIsError(true);
        console.error(err?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (isError) {
    return (
      <div className="h-screen w-screen grid place-items-center">
        <h1 className="text-center text-3xl font-bold">Product not found!</h1>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-column h-auto justify-center gap-4 m-auto p-4 max-w-[600px]">
          <p className="text-2xl font-bold text-center">Details</p>
          <div className="flex flex-column w-full gap-2 items-center">
            {product?.images && (
              <Image
                src={product.images[0]}
                width={300}
                height={300}
                alt={product.title}
              />
            )}
            <div className="text-center">
              <p className="text-3xl font-bold">{product.title}</p>
              <p className="text-md">{product.description}</p>
              <p className="text-xl font-semibold my-4">${product.price}</p>
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-4 mt-2">
              <h3 className="font-bold self-start text-xl ">Reviews</h3>
              {product?.reviews &&
                product.reviews.map((review) => (
                  <div
                    key={uuid()}
                    className="h-max w-full border-2 border-gray-300 rounded-lg p-4"
                  >
                    <header className="w-full flex items-center justify-between">
                      <h2 className="text-lg font-bold">
                        {review.reviewerName}
                      </h2>
                      <p className="font-bold">
                        {formatStars(review.rating)} ({review.rating})
                      </p>
                    </header>
                    <p className="text-lg font-bold">{review.comment}</p>
                    <p className="text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <Link
            href="/"
            className="mt-12 w-56 h-12 bg-blue-600 rounded-lg block m-auto"
          >
            <p className="text-slate-50 text-center translate-y-2.5">Back</p>
          </Link>
        </div>
      )}
    </>
  );
}
