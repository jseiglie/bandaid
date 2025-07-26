import { Link } from "react-router-dom";
import { CartItem } from "../components/cartItem/CartItem";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Cart = () => {
  const { store } = useGlobalReducer();

  return (
    <section
      className="container cart-container d-flex flex-column align-items-center justify-content-center"
      id="cart"
    >
      <h1>Your Shopping Cart</h1>
      {store.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <section className="row">
            <div className="col-sm-12 col-md-8 col-lg-9">
              <h2>Items in Cart</h2>
              <ul className="list-group">
                {store.user.cart?.CartItems.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <CartItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-3">
              <h2>Cart Summary</h2>
              <p>
                You have {store.user.cart?.CartItems.length} items in your cart.
              </p>
              <div className="bg-warning p-2">
                <p className="fw-bold bg-warning">Attention</p>
                <p>
                  We <strong>do not</strong> store your payment information.
                  Please proceed to checkout to complete your purchase.
                </p>
              </div>
              <p className="fw-bold fs-3">
                Total:{" "}
                {store.user.cart?.CartItems.reduce(
                  (acc, item) => acc + item.price,
                  0
                ).toFixed(2)}
                €
              </p>
              <div className="d-flex flex-column align-items-center">
                <Link to="/checkout" className="btn btn-primary w-75">
                  <span className="fa-solid fa-cash-register"></span> Checkout
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
};
