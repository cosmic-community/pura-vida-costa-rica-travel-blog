'use client'

import { Category } from '@/types'
import { useState } from 'react'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button
        onClick={() => setActiveCategory(null)}
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          activeCategory === null
            ? 'bg-jungle-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Categories
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
            activeCategory === category.id
              ? 'text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            backgroundColor: activeCategory === category.id 
              ? category.metadata?.color || '#16a34a'
              : undefined,
          }}
        >
          <span>{category.metadata?.icon}</span>
          {category.metadata?.name || category.title}
        </button>
      ))}
    </div>
  )
}