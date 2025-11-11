import React, { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import axiosClient from "../../api/axiosClient";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export default function ProductsBox() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // آدرس کامل FakeStore API
        const { data } = await axiosClient.get<Product[]>("https://fakestoreapi.com/products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  if (!products.length)
    return <div className="text-center p-4 text-gray-500">No products found...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">#</th>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <img src={p.image} alt={p.title} className="w-12 h-12 object-contain rounded" />
                </td>
                <td className="p-2 font-medium">{p.title}</td>
                <td className="p-2 text-gray-500">{p.category}</td>
                <td className="p-2 font-semibold text-yellow-600">${p.price}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleOpen(p)}
                    className="p-2 text-blue-500 hover:text-blue-700"
                  >
                    <VisibilityIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <img src={p.image} alt={p.title} className="w-16 h-16 object-contain rounded" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-700">{p.title}</h3>
                <p className="text-gray-500 text-sm">{p.category}</p>
                <p className="text-yellow-600 font-semibold">${p.price}</p>
              </div>
              <button
                onClick={() => handleOpen(p)}
                className="text-blue-500 hover:text-blue-700"
              >
                <VisibilityIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 bg-white p-6 rounded-xl shadow-lg transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md">
          {selectedProduct && (
            <>
              <h3 className="text-lg font-bold mb-2">{selectedProduct.title}</h3>
              <img src={selectedProduct.image} alt={selectedProduct.title} className="w-32 h-32 object-contain mb-2 mx-auto" />
              <p className="text-gray-600 mb-1">Category: {selectedProduct.category}</p>
              <p className="text-yellow-600 font-semibold mb-2">Price: ${selectedProduct.price}</p>
              <p className="text-gray-600">{selectedProduct.description}</p>
              <button onClick={handleClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Close
              </button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
