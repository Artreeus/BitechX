"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initializeAuth } from "@/lib/features/auth/authSlice";
import { setCurrentProduct, removeProduct } from "@/lib/features/products/productsSlice";
import { productsApi } from "@/lib/api/products";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { SafeImage } from "@/components/SafeImage";
import { PageLoader } from "@/components/PageLoader";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { currentProduct } = useAppSelector((state) => state.products);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize auth
  useEffect(() => {
    dispatch(initializeAuth());
    setIsInitializing(false);
  }, [dispatch]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitializing, router]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      if (!isAuthenticated) return;

      setLoading(true);
      setError(null);
      try {
        const data = await productsApi.getProductBySlug(resolvedParams.slug);
        dispatch(setCurrentProduct(data));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error && 'response' in err 
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
        setError(errorMessage || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.slug, dispatch, isAuthenticated]);

  const handleDelete = async () => {
    if (!currentProduct) return;

    setIsDeleting(true);
    try {
      await productsApi.deleteProduct(currentProduct.id);
      dispatch(removeProduct(currentProduct.id));
      router.push("/products");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
      alert(errorMessage || "Failed to delete product");
      setIsDeleting(false);
    }
  };

  // Show loader while initializing
  if (isInitializing) {
    return <PageLoader message="Loading product..." />;
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-anti-flash-white">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen bg-anti-flash-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage
            message={error || "Product not found"}
            onRetry={() => window.location.reload()}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anti-flash-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-hooker-green hover:text-opacity-80 transition-colors mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </button>

        {/* Product Detail */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                <SafeImage
                  src={currentProduct.images[selectedImage] || "/placeholder.png"}
                  alt={currentProduct.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {currentProduct.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {currentProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                        ? "border-hooker-green"
                        : "border-transparent hover:border-gray-300"
                        }`}
                    >
                      <SafeImage
                        src={image}
                        alt={`${currentProduct.name} ${index + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex-grow">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-hooker-green bg-opacity-10 text-hooker-green">
                    {currentProduct.category.name}
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="text-4xl font-bold text-rich-black mb-4">
                  {currentProduct.name}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-lion">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-rich-black mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {currentProduct.description}
                  </p>
                </div>

                {/* Product Meta */}
                <div className="border-t border-gray-200 pt-6 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Product ID:</span>
                    <span className="font-mono text-xs">{currentProduct.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Created:</span>
                    <span>
                      {new Date(currentProduct.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Last Updated:</span>
                    <span>
                      {new Date(currentProduct.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => router.push(`/products/edit/${currentProduct.id}`)}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Product
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  className="flex-1"
                  onClick={() => setDeleteConfirm(true)}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${currentProduct.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
}

