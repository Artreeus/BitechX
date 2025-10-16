"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initializeAuth } from "@/lib/features/auth/authSlice";
import {
    setProducts,
    setLoading,
    setError,
    setCurrentPage,
    setSearchQuery,
    setSelectedCategory,
    removeProduct,
} from "@/lib/features/products/productsSlice";
import { setCategories } from "@/lib/features/categories/categoriesSlice";
import { productsApi } from "@/lib/api/products";
import { categoriesApi } from "@/lib/api/categories";
import { Product } from "@/lib/features/products/productsSlice";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PageLoader } from "@/components/PageLoader";
import { motion } from "framer-motion";

const PRODUCTS_PER_PAGE = 10;

export default function ProductsPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { products, loading, error, currentPage, searchQuery, selectedCategory } =
        useAppSelector((state) => state.products);
    const { categories } = useAppSelector((state) => state.categories);

    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const [deleteConfirm, setDeleteConfirm] = useState<{
        isOpen: boolean;
        product: Product | null;
    }>({ isOpen: false, product: null });
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

    // Fetch products
    const fetchProducts = useCallback(async () => {
        if (!isAuthenticated) return;

        dispatch(setLoading(true));
        try {
            let data: Product[];

            if (searchQuery) {
                // Search mode
                data = await productsApi.searchProducts(searchQuery);
            } else {
                // Normal pagination mode with optional category filter
                const params = {
                    offset: (currentPage - 1) * PRODUCTS_PER_PAGE,
                    limit: PRODUCTS_PER_PAGE,
                    ...(selectedCategory && { categoryId: selectedCategory }),
                };
                data = await productsApi.getProducts(params);
            }

            dispatch(setProducts(data));
        } catch (err: unknown) {
            const errorMessage = err instanceof Error && 'response' in err 
              ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
              : undefined;
            dispatch(
                setError(errorMessage || "Failed to fetch products")
            );
        }
    }, [dispatch, isAuthenticated, currentPage, searchQuery, selectedCategory]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearchQuery !== searchQuery) {
                dispatch(setSearchQuery(localSearchQuery));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearchQuery, searchQuery, dispatch]);

    // Show loader while initializing
    if (isInitializing) {
        return <PageLoader message="Loading..." />;
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    const handleCategoryFilter = (categoryId: string) => {
        dispatch(setSelectedCategory(categoryId === "" ? null : categoryId));
    };

    const handleDeleteClick = (product: Product) => {
        setDeleteConfirm({ isOpen: true, product });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteConfirm.product) return;

        setIsDeleting(true);
        try {
            await productsApi.deleteProduct(deleteConfirm.product.id);
            dispatch(removeProduct(deleteConfirm.product.id));
            setDeleteConfirm({ isOpen: false, product: null });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error && 'response' in err 
              ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
              : undefined;
            alert(errorMessage || "Failed to delete product");
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isAuthenticated) {
        return <LoadingSpinner fullScreen />;
    }

    return (
        <div className="min-h-screen bg-anti-flash-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-rich-black mb-2">Products</h1>
                    <p className="text-gray-600">
                        Browse, search, and manage your product catalog
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <Input
                                type="text"
                                placeholder="Search products by name..."
                                value={localSearchQuery}
                                onChange={(e) => setLocalSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory || ""}
                                onChange={(e) => handleCategoryFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hooker-green focus:border-transparent transition-all duration-200 bg-white"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(searchQuery || selectedCategory) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {searchQuery && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-hooker-green bg-opacity-10 text-hooker-green">
                                    Search: {searchQuery}
                                    <button
                                        onClick={() => {
                                            setLocalSearchQuery("");
                                            dispatch(setSearchQuery(""));
                                        }}
                                        className="ml-2 hover:text-chestnut"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {selectedCategory && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-lion bg-opacity-10 text-lion">
                                    Category:{" "}
                                    {categories.find((c) => c.id === selectedCategory)?.name}
                                    <button
                                        onClick={() => dispatch(setSelectedCategory(null))}
                                        className="ml-2 hover:text-chestnut"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={fetchProducts} />
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                            <svg
                                className="w-10 h-10 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchQuery || selectedCategory
                                ? "Try adjusting your search or filters"
                                : "Get started by adding your first product"}
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => router.push("/products/new")}
                        >
                            Add Product
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Products Grid */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                    },
                                },
                            }}
                        >
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <ProductCard
                                        product={product}
                                        onDelete={handleDeleteClick}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {!searchQuery && products.length >= PRODUCTS_PER_PAGE && (
                            <div className="flex justify-center items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <span className="px-4 py-2 text-gray-700">
                                    Page {currentPage}
                                </span>
                                <Button
                                    variant="ghost"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={products.length < PRODUCTS_PER_PAGE}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, product: null })}
                onConfirm={handleDeleteConfirm}
                title="Delete Product"
                message={`Are you sure you want to delete "${deleteConfirm.product?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={isDeleting}
            />
        </div>
    );
}

