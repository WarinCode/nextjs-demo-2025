"use client";

import { useState } from "react";
import { Button, Input, InputGroup, ButtonGroup } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddProductModal from "@/components/AddProductModal";

export default function FormComponent({ handleChange, handleSubmit }) {
  const [modal, setModal] = useState(false);

  const handleToggle = () => {
    setModal((m) => !m);
  };

  return (
    <div className="bg-blue-50 py-6 px-4">
      <AddProductModal modal={modal} handleToggle={handleToggle} />
      <form
        className="flex flex-col sm:flex-row justify-center items-center gap-3"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <InputGroup className="max-w-md">
          <Input placeholder="Search products" onChange={handleChange} required />
        </InputGroup>
        <ButtonGroup>
          <Button
            color="primary"
            size="sm"
            type="submit"
            className="flex! items-center gap-1 me-2"
          >
            <FaSearch />
            Search
          </Button>
          <Button
            color="success"
            size="sm"
            type="button"
            className="flex! items-center gap-1"
            onClick={handleToggle}
          >
            <IoMdAdd />
            Add
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
