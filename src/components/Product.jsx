import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { handlerToCart } from "../redux/cartItemsSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const { Meta } = Card;

  return (
    <Card
      hoverable
      style={{ width: 240, marginBottom: 30 }}
      cover={
        <img alt={product.name} src={product.image} style={{ height: 200 }} />
      }
    >
      <Meta title={product.name} description={`$${product.price}`} />
      <div className="product-btn">
        <Button onClick={() => dispatch(handlerToCart(product))}>
          Add To Cart
        </Button>
      </div>
    </Card>
  );
};

export default Product;
