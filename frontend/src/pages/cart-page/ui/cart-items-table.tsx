import { Table, Button, Image, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";

import type { CartArrayItem } from "@/features/cart/types";
import { useAppDispatch } from "@/app/store";
import { cartSlice } from "@/features/cart/model/cart.slice";
import { cloudinary } from "@/shared/cloudinary";

const CartItemsTable = ({ cartItems }: { cartItems: CartArrayItem[] }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseItem = (_id: string) => {
    dispatch(cartSlice.actions.increaseItemQty({ _id }));
  };

  const handleDecreaseItem = (_id: string) => {
    dispatch(cartSlice.actions.reduceItemQty({ _id }));
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope="col" className="h5 ">
            Shopping Cart
          </th>

          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>

      <tbody>
        {cartItems &&
          cartItems.map((item) => (
            <tr key={item._id}>
              <th scope="row">
                <div className="d-flex align-items-center">
                  <Image
                    src={cloudinary(item.image).myImage.toURL()}
                    rounded
                    fluid
                    style={{ width: 120 }}
                    alt="Book"
                  />
                  <div className="flex-column ms-4">
                    <p className="mb-2 text-left">{item.name}</p>
                  </div>
                </div>
              </th>

              <td className="align-middle">
                <div className="d-flex flex-row align-items-center">
                  <Button
                    variant="link"
                    className="px-2"
                    onClick={() => handleDecreaseItem(item._id)}
                  >
                    <FaMinus />
                  </Button>
                  <Form.Control
                    min={1}
                    type="number"
                    size="sm"
                    style={{ width: 60 }}
                    value={item.qty}
                    readOnly
                  />
                  <Button
                    onClick={() => handleIncreaseItem(item._id)}
                    variant="link"
                    className="px-2"
                  >
                    <FaPlus />
                  </Button>
                </div>
              </td>
              <td className="align-middle">
                <p className="mb-0" style={{ fontWeight: 500 }}>
                  ${item.price}
                </p>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default CartItemsTable;
