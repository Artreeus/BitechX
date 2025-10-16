"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/features/products/productsSlice";
import { SafeImage } from "./SafeImage";

interface ProductCardProps {
  product: Product;
  onDelete: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative h-48 overflow-hidden bg-gray-100">
        <SafeImage
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-lion text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${product.price.toFixed(2)}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-rich-black hover:text-hooker-green transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Category */}
        <div className="mt-3 flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-hooker-green bg-opacity-10 text-hooker-green">
            {product.category.name}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Link
            href={`/products/edit/${product.id}`}
            className="flex-1 text-center px-4 py-2 bg-hooker-green text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium"
          >
            Edit
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(product);
            }}
            className="flex-1 px-4 py-2 bg-chestnut text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

