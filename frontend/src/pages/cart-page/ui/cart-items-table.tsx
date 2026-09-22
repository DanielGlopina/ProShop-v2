import {Table, Button, Image, Form, } from 'react-bootstrap'
import {
    FaMinus,
    FaPlus,
} from "react-icons/fa";

import type { CartItem } from '@/features/cart/types';
import { useAppDispatch } from '@/app/store';
import { cartSlice } from '@/features/cart/cart.slice';

const CartItemsTable = ({cartItemsEntries}: {cartItemsEntries: [string, CartItem][]}) => {

      const dispatch = useAppDispatch()
     const handleIncreaseItem = (_id: string) => {
    dispatch(cartSlice.actions.increaseItemQty({_id}));
  }

  const handleDecreaseItem = (_id: string) => {
    dispatch(cartSlice.actions.reduceItemQty({_id}));
  }


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
                {cartItemsEntries &&
                  cartItemsEntries.map((entrie) => {
                    const id = entrie[0];
                    const item = entrie[1];

                    return (
                      <tr key={id}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <Image
                              src={item.image}
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
                            <Button variant="link" className="px-2" onClick={() => handleDecreaseItem(id)}>
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
                            <Button onClick={() => handleIncreaseItem(id)} variant="link" className="px-2">
                              <FaPlus />
                            </Button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="mb-0" style={{fontWeight: 500}}>
                            ${item.price}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
  )
}

export default CartItemsTable