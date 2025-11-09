"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const AddProductModal = ({ modal, handleToggle }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);

  useEffect(() => {
    productNameRef.current = productName;
  }, [productName]);

  useEffect(() => {
    productPriceRef.current = productPrice;
  }, [productPrice]);

  const handleAddProduct = useCallback(async () => {
    const payload = {
      title: productNameRef.current,
      price: productPriceRef.current,
    };

    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data){
        alert("Product added successfully!");
      }
      handleToggle();
    } catch (err) {
      alert(err?.message);
      console.error(err?.message);
    }
  }, []);

  return (
    <Modal isOpen={modal} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle} className="font-bold text-lg">
        Add Product
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="productName">Product Name</Label>
            <Input
              id="productName"
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="productPrice">Price</Label>
            <Input
              id="productPrice"
              type="number"
              onChange={(e) => setProductPrice(parseInt(e.target.value))}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddProduct}>
          Add
        </Button>{" "}
        <Button color="secondary" onClick={handleToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddProductModal;
