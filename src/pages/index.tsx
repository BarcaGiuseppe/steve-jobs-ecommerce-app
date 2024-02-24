import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

import styled from "styled-components";
import { useDataCardByContext } from "@/ContextProvider";

const HomeWrapper = styled.div(() => ({
  display: "flex",
  flexWrap: "wrap",
  margin: "20px",
}));

const Card = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  borderRadius: "12px",
  justifyContent: "space-around",
  margin: "10px",
  maxWidth: "300px",
  boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
}));

const Img = styled.img(() => ({
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  maxWidth: "100%",
  objectFit: "cover",
}));

const TitleContainer = styled.div(() => ({
  display: "flex",
  justifyContent: "space-between",
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

const Button = styled.button<{ isLike: boolean }>((props) => ({
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: "2em",
  color: props.isLike ? "red" : "",
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

export default function Home() {
  const { products } = useDataCardByContext();
  console.log(products);
  return (
    <HomeWrapper>
      {products !== null ? (
        products.map((product) => (
          <Card key={product.id}>
            <Img src={product.image} alt={product.title}></Img>
            <TitleContainer>
              <Title>{product.title}</Title>
              <Price>{product.price + "€"}</Price>
            </TitleContainer>
            <Description>{product.description}</Description>
          </Card>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </HomeWrapper>
  );
}
