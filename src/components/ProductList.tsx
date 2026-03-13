import Product from './typeForm'

interface IProps {
  items: Product[]
}

function ProductList({ items }: IProps) {
  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
                <th className="px-33 py-2 border ">Тип</th>
            <th className="px-33 py-2 border ">Имя</th>
        
            
            <th className="px-33 py-2 border ">Описание</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product, index) => (
            <tr
              key={product.id ?? index}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
                <td className="px-33 py-2 border text-center">{product.category}</td>
              <td className="px-33 py-2 border text-center">{product.name}</td>
            
              <td className="px-33 py-2 border text-center">{product.description_short}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList