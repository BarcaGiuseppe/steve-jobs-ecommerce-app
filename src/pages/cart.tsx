import { useDataCardByContext } from "@/ContextProvider";
import { Product } from "@/declarations";
import { selectCart } from "@/lib/features/cart/sliceCart";
import { selectProducts } from "@/lib/features/products/sliceProduct";
import Link from "next/link";
import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CartPageWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const CartContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "80%",
  marginTop: "20px",
}));

const CartItem = styled.div(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  width: "80%",
  marginBottom: "10px",
}));

const ProductInfo = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));

const ProductImage = styled.img(() => ({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  marginRight: "20px",
}));

const ProductTitle = styled.h3(() => ({
  margin: "0",
}));

const ProductPrice = styled.p(() => ({
  margin: "0",
}));

const QuantityWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}));

const QuantityInput = styled.input(() => ({
  width: "40px",
}));

const RemoveButton = styled.button(() => ({
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "5px 10px",
  cursor: "pointer",
}));

const TotalWrapper = styled.div(() => ({
  marginTop: "20px",
}));

const TotalLabel = styled.p(() => ({
  fontWeight: "bold",
}));

const TotalAmount = styled.span(() => ({
  fontSize: "1.2em",
  marginLeft: "10px",
}));

const BuyButton = styled.button<{ isEmpty: boolean }>((props) => ({
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "5px 10px",
  cursor: props.isEmpty ? "not-allowed" : "pointer",
  marginTop: "20px",
  fontSize: "1em",
  opacity: props.isEmpty ? "0.5" : "none",
}));

export default function Cart() {
  const { products, removeFromCart, addToCart, pay, getProductQuantity } =
    useDataCardByContext();

  const cart = useSelector(selectCart);

  const products2 = useSelector(selectProducts);
  console.log(products2);
  const isEmpty = !cart.length;
  //console.log(isEmpty);

  const getProductById = (productId: Product["id"]) => {
    return products !== null
      ? products.find((product) => product.id === productId)
      : null;
  };

  const calculateTotal = () => {
    return cart.reduce((total: any, cartItem: any) => {
      const product = getProductById(cartItem.id);
      if (product) {
        return total + product.price * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  const handleQuantityChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: Product["id"],
    qnt: Product["qty"]
  ) => {
    const newQuantity = parseInt(event.target.value);
    newQuantity > qnt ? addToCart(id) : removeFromCart(id);
    //getProductQuantity(id, true);
  };

  return (
    <CartPageWrapper>
      <h1>Your Cart</h1>
      <CartContainer>
        {cart.map((cartItem: any, index: any) => {
          const product = getProductById(cartItem.id);
          if (!product) return null;
          return (
            <CartItem key={index}>
              <ProductInfo>
                <ProductImage src={product.thumbnail} alt={product.title} />
                <div>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>{product.price}€</ProductPrice>
                </div>
              </ProductInfo>
              <QuantityWrapper>
                <QuantityInput
                  type="number"
                  value={cartItem.quantity}
                  onChange={(event) =>
                    handleQuantityChange(event, cartItem.id, cartItem.quantity)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key !== "ArrowUp" &&
                      event.key !== "ArrowDown" &&
                      event.key !== "ArrowLeft" &&
                      event.key !== "ArrowRight" &&
                      event.key !== "Backspace" &&
                      event.key !== "Delete"
                    ) {
                      event.preventDefault();
                    }
                    if (event.key == "ArrowDown") {
                      //NON FUNZIONA
                      console.log("Arrow Down");
                    }
                  }}
                />
                <RemoveButton
                  onClick={() => {
                    removeFromCart(cartItem.id);
                    //getProductQuantity(cartItem.id, false);
                  }}
                >
                  Remove
                </RemoveButton>
              </QuantityWrapper>
            </CartItem>
          );
        })}
        <TotalWrapper>
          <TotalLabel>Total:</TotalLabel>
          <TotalAmount>{calculateTotal()}€</TotalAmount>
        </TotalWrapper>
        <BuyButton isEmpty={isEmpty} onClick={pay} disabled={isEmpty}>
          {isEmpty ? (
            "Buy Now"
          ) : (
            <Link
              href="/success"
              style={{ color: "white", textDecoration: "inherit" }}
            >
              Buy Now
            </Link>
          )}
        </BuyButton>
      </CartContainer>
    </CartPageWrapper>
  );
}
