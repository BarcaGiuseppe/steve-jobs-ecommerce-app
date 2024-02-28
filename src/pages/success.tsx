import { useDataCardByContext } from "@/ContextProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success() {
  const { paid } = useDataCardByContext();

  const router = useRouter();

  useEffect(() => {
    if (!paid) {
      //window.history.pushState("", "", "/");
      router.push("/");
      //router.back();
    }
  }, []);

  return <h1>Success</h1>;
}
