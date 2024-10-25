import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  ArrowBigUpIcon,
  BabyIcon,
  ChartNoAxesColumnIncreasing,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  FootprintsIcon,
  Heading,
  Layers2,
  PawPrint,
  Shirt,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

// Category and Brand Icons
const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: FootprintsIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: ArrowBigUpIcon },
  { id: "adidas", label: "Adidas", icon: ChartNoAxesColumnIncreasing },
  { id: "puma", label: "Puma", icon: PawPrint },
  { id: "levi", label: "Levi's", icon: Shirt },
  { id: "zara", label: "Zara", icon: Layers2 },
  { id: "h&m", label: "H&M", icon: Heading },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const slides = [bannerOne, bannerTwo, bannerThree];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product Added to Cart" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Slightly slower transition for better user experience
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Slideshow with Fade Animation */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out`}
            alt={`Slide ${index + 1}`}
          />
        ))}

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-200 transition"
        >
          <ChevronLeftIcon className="w-5 h-5 text-black" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-200 transition"
        >
          <ChevronRightIcon className="w-5 h-5 text-black" />
        </Button>
      </div>

      {/* Category Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                onMouseEnter={() => setHoveredCardId(categoryItem.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                key={categoryItem.id}
                className={`cursor-pointer transition-transform transform ${
                  hoveredCardId === categoryItem.id ? "scale-105" : "scale-100"
                } hover:shadow-lg transition-shadow hover:bg-gray-100 duration-300 ease-in-out`}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <categoryItem.icon
                    className={`w-8 h-8 mb-3 ${
                      hoveredCardId === categoryItem.id ? "text-blue-700" : "text-blue-500"
                    } transition-colors duration-300`}
                  />
                  <span className="font-semibold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Shop by Brand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                onMouseEnter={() => setHoveredCardId(brandItem.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                key={brandItem.id}
                className={`cursor-pointer transition-transform transform ${
                  hoveredCardId === brandItem.id ? "scale-105" : "scale-100"
                } hover:shadow-lg transition-shadow hover:bg-gray-100 duration-300 ease-in-out`}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <brandItem.icon
                    className={`w-8 h-8 mb-3 ${
                      hoveredCardId === brandItem.id ? "text-green-700" : "text-green-500"
                    } transition-colors duration-300`}
                  />
                  <span className="font-semibold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Products Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
