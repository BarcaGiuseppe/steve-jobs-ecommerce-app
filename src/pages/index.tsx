import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });

import styled from "styled-components";
import { useDataCardByContext } from "@/ContextProvider";
import { Product } from "@/declarations";

const HomeWrapper = styled.div(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  margin: "20px",
}));

const Card = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  borderRadius: "12px",
  justifyContent: "space-between",
  margin: "10px",
  maxWidth: "300px",
  boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
}));

const Img = styled.img(() => ({
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  maxWidth: "100%",
  objectFit: "contain",
}));

const ItemWrapper = styled.div(() => ({
  display: "flex",
  justifyContent: "space-around",
}));

const Title = styled.h2(() => ({
  textAlign: "center",
  margin: "10px",
  marginLeft: "20px",
}));

const Price = styled.button(() => ({
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: "2em",
  outline: "none",
  margin: "10px",
  marginRight: "20px",
}));

const Button = styled.button(() => ({
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: "2em",
  color: "black",
  outline: "none",
  margin: "10px",
  marginRight: "20px",
}));

const Description = styled.p(() => ({
  textAlign: "center",
  margin: "10px",
  marginBottom: "20px",
  fontSize: "medium",
}));

const QuantityLabel = styled.span(() => ({
  fontSize: "1em",
  color: "black",
}));

export default function Home() {
  const { products, addToCart } = useDataCardByContext();

  const onClickAddToCart = (id: Product["id"]) => {
    addToCart(id);
  };

  return (
    <HomeWrapper>
      {products !== null ? (
        products.map((product) => (
          <Card key={product.id}>
            <Img src={product.image} alt={product.title}></Img>
            <ItemWrapper>
              <Title>{product.title}</Title>
            </ItemWrapper>
            <ItemWrapper>
              <Price>
                <QuantityLabel>N.</QuantityLabel> {product.qty}
              </Price>
              <Price>{product.price + "€"}</Price>
              <Button onClick={() => onClickAddToCart(product.id)}>
                <FontAwesomeIcon icon={faCartShopping} />
              </Button>
            </ItemWrapper>
            <Description>{product.description}</Description>
          </Card>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </HomeWrapper>
  );
}
