import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useState } from "react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setcurrentEditedId,
  handleDelete
}) {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className={`w-full max-w-sm mx-auto transform transition-transform duration-300 ${hover ? 'scale-105 shadow-xl' : 'shadow-md'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover transition-transform duration-300 transform hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-gray-500" : "text-gray-800"
            } text-lg font-semibold transition-colors duration-300`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-bold text-red-500">${product?.salePrice}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gray-100 border-t border-gray-200">
        <Button
          className="transition-transform duration-300 transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setcurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button
          className="transition-transform duration-300 transform hover:scale-105 bg-red-500 hover:bg-red-600 text-white"
          onClick={() => handleDelete(product?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
