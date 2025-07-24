'use client'

import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button
        onClick={() => onCategoryChange(null)}
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
          onClick={() => onCategoryChange(category.id)}
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