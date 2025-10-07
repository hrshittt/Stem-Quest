import React from 'react'

const Breadcrumb = ({ currentPath, onNavigate }) => {
  const renderBreadcrumbItem = (item, index, isLast) => {
    if (isLast) {
      return (
        <span key={index} className="text-gray-400">
          {item.label}
        </span>
      )
    }

    return (
      <React.Fragment key={index}>
        <button
          onClick={() => onNavigate(item.action, item.data)}
          className="text-stem-blue hover:text-stem-purple transition-colors duration-300"
        >
          {item.label}
        </button>
        <span className="mx-2 text-gray-500">/</span>
      </React.Fragment>
    )
  }

  return (
    <nav className="flex items-center justify-center mb-8 text-sm md:text-base">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-600">
        {currentPath.map((item, index) => 
          renderBreadcrumbItem(item, index, index === currentPath.length - 1)
        )}
      </div>
    </nav>
  )
}

export default Breadcrumb
