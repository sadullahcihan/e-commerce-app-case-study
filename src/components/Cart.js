import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Button, Card, List, Typography, Space } from "antd";
import { Badge } from "antd";

const { Title, Text } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Syncs Cart localStorage
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    const timeoutId = setTimeout(saveToLocalStorage, 500);
    //cleanup previous timeout
    return () => clearTimeout(timeoutId);
  }, [cartItems]);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Card
        title={<Title level={4}>Your Cart</Title>}
        style={{ marginBottom: "10px", marginTop: "20px" }}
      >
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item key={item.id} className="cart-item">
                  <Space direction="vertical" className="cart-item-details">
                    <Space
                      direction="horizontal"
                      className="item-header"
                      justify="space-between"
                    >
                      <Title level={5}>{item.name}</Title>
                      <Button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <Badge
                        count={item.quantity}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          fontSize: "16px",
                          height: "30px",
                          width: "30px",
                          lineHeight: "30px",
                          borderRadius: "0",
                          textAlign: "center",
                        }}
                      />
                      <Button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </Space>
                    <Space className="quantity-control">
                      <Text>{item.price} $</Text>
                    </Space>
                  </Space>
                </List.Item>
              )}
            />
            <Button type="primary" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
        )}
      </Card>

      <Card style={{ marginTop: "10px" }}>
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", alignContent: "center" }}
        >
          <Text strong>
            <span style={{ color: "black" }}>Total Price: </span>
            <span style={{ color: "#007bff" }}>{calculateTotalPrice()} $</span>
          </Text>

          <Button type="primary" size="large" style={{ width: "100%" }}>
            Checkout
          </Button>
        </Space>
      </Card>
    </>
  );
};

export default Cart;
