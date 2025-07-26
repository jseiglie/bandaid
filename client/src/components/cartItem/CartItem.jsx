export const CartItem = ({ item }) => {
  console.log("CartItem props:", item);
  return (
    <article className="cart-item d-flex justify-content-between align-items-center text-start mb-3">
      <div className="d-flex align-items-center">
        <figure>
          <img
            src={item.image}
            alt={item.name}
            className="img-fluid"
            width={250}
            height={250}
          />
        </figure>
        <div>
          <h3 className="d-inline">{item.name}</h3>
          <span className="fs-3">@{item.owner}</span>
          <p className="mb-0">{item.description}</p>
          <p className="badge bg-secondary">{item.category}</p>
        </div>
        <div className="ms-3">
          <p className="badge bg-secondary">{item.quantity}</p>
        </div>
      </div>
      <div className="item-details text-start">
        <p>Price: ${item.price}</p>
        <button
          className="btn btn-danger"
          onClick={() => item.removeFromCart(item.id)}
        >
          <span className="fa-solid fa-trash"></span>
        </button>
      </div>
    </article>
  );
};
