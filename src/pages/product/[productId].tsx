import { useDataCardByContext } from "@/ContextProvider";
import { Product } from "@/declarations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ProductPageWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ProductContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "80%",
  marginTop: "20px",
}));

const ProductItems = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  width: "80%",
  margin: "20px",
}));

const ProductInfo = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ProductImage = styled.img(() => ({
  maxWidth: "400px",
  maxHeight: "400px",
  objectFit: "cover",
  marginRight: "20px",
}));

const ProductTitle = styled.h3(() => ({
  margin: "30px",
}));

const ProductPrice = styled.p(() => ({
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: "2em",
  outline: "none",
  margin: "10px",
  marginRight: "20px",
}));

const ProductDescription = styled.p(() => ({
  margin: "10px",
}));

const QuantityWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
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

const BuyButton = styled.button(() => ({
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "5px 10px",
  cursor: "pointer",
  marginTop: "20px",
  fontSize: "1em",
  opacity: "none",
}));

const useProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { productId } = router.query;

  console.log(productId);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://mockend.up.railway.app/api/products/${productId}`
      );
      const data: Product = await response.json();
      console.log("abbiamo i dati");
      setProduct(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return { product, loading, error };
};

export default function Product() {
  const { product, loading, error } = useProductDetail();

  const { addToCart, removeFromCart, cart } = useDataCardByContext();

  const router = useRouter();
  const { productId } = router.query;

  const qntIntoCart = cart.find(
    (el) => el.id === parseInt(productId as string)
  )?.quantity;

  console.log(product);
  return (
    <ProductPageWrapper>
      <h1>PRODUCT</h1>
      <ProductContainer>
        {product != null ? (
          <>
            <ProductItems key={product.id}>
              <ProductInfo>
                <ProductImage src={product.image} alt={product.title} />
                <div>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <QuantityWrapper>
                    <ProductPrice>N. {product.qty}</ProductPrice>
                    <ProductPrice>{product.price}€</ProductPrice>
                    <p>Qnt into Cart: </p>
                    <QuantityInput
                      type="number"
                      value={qntIntoCart}
                    ></QuantityInput>
                    <RemoveButton onClick={() => addToCart(product.id)}>
                      +
                    </RemoveButton>
                    <RemoveButton onClick={() => removeFromCart(product.id)}>
                      -
                    </RemoveButton>
                  </QuantityWrapper>
                </div>
              </ProductInfo>
            </ProductItems>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </ProductContainer>
    </ProductPageWrapper>
  );
}
