"use client";
import { useState } from "react";
import Product from "./typeForm";
import ProductList from "./ProductList";
import Form from "./Form";
import { Button } from "./ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type ProductsResponse = {
  result: Product[];
};

function MainPage() {
  const [modal, setModalOpen] = useState<boolean>(false);

  async function fetchData() {
    const response = await fetch("/api");
    const result = await response.json();
    return result;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  const queryClient = useQueryClient();
  function handleAddProduct(product: Product) {
    queryClient.invalidateQueries({ queryKey: ["data"] });
    queryClient.setQueryData<ProductsResponse>(["data"], (oldData) => {
      const currentData = oldData?.result ?? [];
      return {
        result: [...currentData, product],
      };
    });
  }
  return (
    <div>
      <div className="">
        <div className="">
          <Button
            className="bg-sky-500 hover:bg-sky-700 "
            onClick={() => setModalOpen(true)}
          >
            Add
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="flex absolute ">
            {modal && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-40 "
                  onClick={() => setModalOpen(false)}
                />

                <div className="fixed inset-0 flex items-center justify-center z-50 relative">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Button
                      className="absolute top-2 right-2 outline "
                      onClick={() => setModalOpen(false)}
                    >
                      X
                    </Button>
                    <div className="mr-10">
                      <Form
                        onAdd={handleAddProduct}
                        onCancel={() => setModalOpen(false)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ProductList items={data ? data.result : []} />
      )}
    </div>
  );
}

export default MainPage;
