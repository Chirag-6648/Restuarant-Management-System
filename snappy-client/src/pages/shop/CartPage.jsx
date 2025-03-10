import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, refetch } = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // calculate Price
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;

  //decrease item quatity
  const handleDecrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:3000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update Quantity");
      }
    } catch (error) {
      console.error("Error updating Quantity:", error);
    }
  };
  // increase item quantity
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:3000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update Quantity");
      }
    } catch (error) {
      console.error("Error updating Quantity:", error);
    }
  };
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      {/* banner */}
      <div className="section-container">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-gray-300">
              Items Added To The <span className="text-yellow">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      {cart.length > 0 ? (
        <div>
          <div className="overflow-x-auto section-container">
            <table className="table">
              {/* head */}
              <thead className="bg-yellow text-white text-[14px]">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-[15px]">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs bg-slate-800 text-white border-none hover:bg-gray-950"
                        onClick={() => {
                          handleDecrease(item);
                        }}>
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => {
                          console.log(item);
                        }}
                        className="w-10 text-center mx-2 overflow-hidden appearance-none bg-gray-900"
                      />
                      <button
                        className="btn btn-xs bg-slate-800 text-white border-none hover:bg-gray-950"
                        onClick={() => {
                          handleIncrease(item);
                        }}>
                        +
                      </button>
                    </td>
                    <td>₹ {calculateTotalPrice(item).toFixed(2)}</td>
                    <th>
                      <button
                        className="btn text-red btn-ghost btn-xs"
                        onClick={() => {
                          handleDelete(item);
                        }}>
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* customer details */}
          <div className="my-12 section-container flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3  p-5 rounded-md text-gray-300">
              <h3 className="font-semibold text-lg">Customer Details</h3>
              <p>Name : {user.displayName}</p>
              <p>Email : {user.email}</p>
              <p>User_id : {user.uid}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <div className="md:w-1/2 space-y-3  p-5 rounded-md text-gray-300">
                <h3 className="font-semibold text-lg">Shipping Details</h3>
                <p>Total Items : {cart.length}</p>
                <p>
                  Total Price :<span>₹ {orderTotal.toFixed(2)} </span>{" "}
                </p>
                <Link to="/payment">
                  <button className="btn bg-yellow text-white hover:bg-gray-950">
                    Proceed Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 pb-[150px]">
          <p className="text-gray-300">Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3 bg-yellow hover:border-yellow hover:bg-gray-950">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
