"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  ButtonGroup,
  Button,
} from "reactstrap";
import EditProductModal from "@/components/EditProductModal";
import { MdEdit, MdDelete } from "react-icons/md";

const ProductCard = ({ product, setLoading, setProducts }) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [productName, setProductName] = useState(product.title);
  const [productPrice, setProductPrice] = useState(product.price);
  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const productId = product.id;

  useEffect(() => {
    productNameRef.value = product.title;
    productPriceRef.value = product.price;
  }, []);

  useEffect(() => {
    productNameRef.value = productName;
  }, [productName]);

  useEffect(() => {
    productPriceRef.value = productPrice;
  }, [productPrice]);

  const handleToggle = useCallback(() => {
    setModal((m) => !m);
  }, [modal]);

  const handlePreviewProductDetails = useCallback(() => {
    router.push(`/products/${productId}`);
  }, []);

  const handleDeleteProduct = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.isDeleted) {
        alert("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productId)
        );
        return;
      }

      throw new Error("Failed to delete the product");
    } catch (err) {
      alert(err?.message);
      console.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditProduct = useCallback(async () => {
    const payload = {
      title: productNameRef.value,
      price: productPriceRef.value,
    };

    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (response.ok && data) {
        alert("Product updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((p) => {
            if (p.id === productId) {
              p.title = payload.title;
              p.price = payload.price;
            }
            return p;
          })
        );
      }
    } catch (e) {
      alert(e?.message);
      console.error(e?.message);
    }
  }, []);

  return (
    <Card
      style={{
        borderRadius: "1rem",
      }}
      className="p-2 flex flex-col items-center justify-between border-2 border-gray-400 cursor-pointer transition shadow-lg hover:shadow-2xl"
    >
      <EditProductModal
        product={product}
        modal={modal}
        setProductName={setProductName}
        setProductPrice={setProductPrice}
        handleToggle={handleToggle}
        handleEditProduct={handleEditProduct}
      />
      <Image
        alt={product.title}
        src={product.images[0]}
        width={300}
        height={300}
        onClick={handlePreviewProductDetails}
      />
      <CardBody onClick={handlePreviewProductDetails}>
        <CardTitle className="text-xl text-center text-bold text-black">
          {product.title}
        </CardTitle>
        <CardText className="text-lg text-center text-semi-bold">
          ${product.price}
        </CardText>
      </CardBody>
      <CardFooter className="bg-transparent">
        <ButtonGroup className="w-full flex items-center justify-around mt-2">
          <Button color="primary" className="me-3" onClick={handleToggle}>
            <MdEdit className="inline-block me-2" />
            <span>Edit</span>
          </Button>
          <Button color="danger" onClick={handleDeleteProduct}>
            <MdDelete className="inline-block me-2" />
            <span>Delete</span>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
