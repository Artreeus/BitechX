"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/features/products/productsSlice";
import { SafeImage } from "./SafeImage";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onDelete: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative h-48 overflow-hidden bg-gray-100">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <SafeImage
            src={product.images[0] || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute top-2 right-2 bg-lion text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          ${product.price.toFixed(2)}
        </motion.div>
      </Link>

      {/* Content */}
      <motion.div
        className="p-4 flex flex-col flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Link href={`/products/${product.slug}`}>
          <motion.h3
            className="text-lg font-semibold text-rich-black line-clamp-2"
            whileHover={{ color: "#4E6E5D", x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {product.name}
          </motion.h3>
        </Link>

        <motion.p
          className="text-sm text-gray-600 mt-2 line-clamp-2 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product.description}
        </motion.p>

        {/* Category */}
        <motion.div
          className="mt-3 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, type: "spring" }}
        >
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-hooker-green bg-opacity-10 text-hooker-green">
            {product.category.name}
          </span>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="mt-4 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`/products/edit/${product.id}`}
              className="block text-center px-4 py-2 bg-hooker-green text-white rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Edit
            </Link>
          </motion.div>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              onDelete(product);
            }}
            className="flex-1 px-4 py-2 bg-chestnut text-white rounded-lg transition-all duration-200 text-sm font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Delete
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

