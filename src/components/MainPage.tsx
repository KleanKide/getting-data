"use client";
import { useEffect, useState } from "react";
import Product from "./typeForm";
import { GET } from "../app/api/route";
import ProductList from "./ProductList";
import Form from "./Form";
import { Button } from "./ui/button";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const response = await GET(
         `https://app.tablecrm.com/api/v1/nomenclature/?token=${apiKey}`,
      );
      setProducts(response.result || []);
    }
    fetchData();
  }, []);

  function handleAddProduct(product: Product) {
    setProducts((prev) => [...prev, product]);
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
      <ProductList items={products} />
    </div>
  );
}

export default MainPage;
