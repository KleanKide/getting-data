import Product from './typeForm'

interface IProps {
    items: Product[]
}

function ProductList({items}: IProps) {
  return (
    <div >
          {items.map((product: Product, index) => (
            <div key={product.id ?? index} >{product.name}</div>
          ))}
    </div>
  )
}

export default ProductList