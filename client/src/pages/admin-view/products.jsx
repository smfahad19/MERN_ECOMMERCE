import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editaProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice"; // Include editaProduct
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setcurrentEditedId] = useState(null); // For editing product

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Handle form submission for adding or editing
  function onSubmit(event) {
    event.preventDefault();

    // Check if it's edit mode
    if (currentEditedId !== null) {
      // Edit product
      dispatch(
        editaProduct({
          id: currentEditedId,
          formData: {
            ...formData,
            image: uploadedImageUrl, // Update image
          },
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({
            title: "Product updated successfully",
          });
        }
      });
    } else {
      // Add new product
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({
            title: "Product added successfully",
          });
        }
      });
    }
  }

  // Reset form and dialog state
  function resetForm() {
    setOpenCreateProductsDialog(false);
    setImageFile(null);
    setFormData(initialFormData);
    setcurrentEditedId(null); // Reset edit mode
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id} // Ensure unique keys using a unique identifier
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setcurrentEditedId={setcurrentEditedId} // Set product for editing
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => resetForm()}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription>
              {currentEditedId !== null
                ? "Update the product details below."
                : "Fill in the details below to add a new product."}
            </SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
