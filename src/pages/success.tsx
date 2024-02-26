import { useDataCardByContext } from "@/ContextProvider";
import router from "next/router";
import { useEffect } from "react";

export default function Success() {
  const { paid } = useDataCardByContext();
  useEffect(() => {
    if (!paid) {
      router.push("/");
    }
  }, []);
  return <h1>Success</h1>;
}
