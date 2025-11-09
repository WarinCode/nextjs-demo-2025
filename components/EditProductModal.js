"use client";

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

const EditProductModal = ({
  modal,
  handleToggle,
  product,
  handleEditProduct,
  setProductName,
  setProductPrice,
}) => {
  return (
    <Modal isOpen={modal} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle} className="font-bold text-lg">
        Edit Product
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="productName">Product Name</Label>
            <Input
              id="productName"
              type="text"
              defaultValue={product.title}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="productPrice">Price</Label>
            <Input
              id="productPrice"
              type="number"
              defaultValue={product.price}
              onChange={(e) =>
                setProductPrice(parseInt(e.target.value))
              }
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditProduct}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={handleToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditProductModal;
