"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initializeAuth } from "@/lib/features/auth/authSlice";
import { setCategories } from "@/lib/features/categories/categoriesSlice";
import { addProduct } from "@/lib/features/products/productsSlice";
import { productsApi } from "@/lib/api/products";
import { categoriesApi } from "@/lib/api/categories";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { PageLoader } from "@/components/PageLoader";

interface FormData {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  images: string[];
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  categoryId?: string;
  images?: string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.categories);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    images: [""],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Initialize auth
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getCategories();
        dispatch(setCategories(data));
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    if (isAuthenticated) {
      fetchCategories();
    }
  }, [dispatch, isAuthenticated]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum)) {
        newErrors.price = "Price must be a valid number";
      } else if (priceNum <= 0) {
        newErrors.price = "Price must be greater than 0";
      } else if (priceNum > 1000000) {
        newErrors.price = "Price must be less than 1,000,000";
      }
    }

    // Category validation
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    // Images validation
    const validImages = formData.images.filter((img) => img.trim() !== "");
    if (validImages.length === 0) {
      newErrors.images = "At least one image URL is required";
    } else {
      // Validate URL format
      const urlPattern = /^https?:\/\/.+/;
      const invalidUrls = validImages.filter((url) => !urlPattern.test(url));
      if (invalidUrls.length > 0) {
        newErrors.images = "All image URLs must be valid URLs (starting with http:// or https://)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const validImages = formData.images.filter((img) => img.trim() !== "");
      const newProduct = await productsApi.createProduct({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        images: validImages,
      });

      dispatch(addProduct(newProduct));
      router.push("/products");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
      setApiError(
        errorMessage || "Failed to create product. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
    }
  };

  if (!isAuthenticated) {
    return <PageLoader message="Checking authentication..." />;
  }

  return (
    <div className="min-h-screen bg-anti-flash-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          Back
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-rich-black mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600 mb-8">
            Fill in the details to add a new product to your catalog
          </p>

          {apiError && (
            <div className="mb-6 bg-chestnut bg-opacity-10 border border-chestnut rounded-lg p-4">
              <p className="text-chestnut text-sm">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <Input
              label="Product Name"
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              required
            />

            {/* Description */}
            <Textarea
              label="Description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              error={errors.description}
              rows={4}
              required
            />

            {/* Price */}
            <Input
              label="Price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              error={errors.price}
              required
            />

            {/* Category */}
            <Select
              label="Category"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              error={errors.categoryId}
              required
            />

            {/* Image URLs */}
            <div>
              <label className="block text-sm font-medium text-rich-black mb-1">
                Image URLs <span className="text-chestnut">*</span>
              </label>
              <div className="space-y-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 text-chestnut hover:bg-chestnut hover:bg-opacity-10 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
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
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-chestnut">{errors.images}</p>
              )}
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 text-sm text-hooker-green hover:text-opacity-80 transition-colors"
              >
                + Add another image
              </button>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="flex-1"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
                isLoading={isSubmitting}
              >
                Create Product
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

