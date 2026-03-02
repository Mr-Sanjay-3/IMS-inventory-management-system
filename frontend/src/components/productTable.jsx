
import '../scss/ProductTable.scss'
const ProductTable = ({ products, onEdit, onDelete, onCreate}) => {
    return (
      <>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => onCreate(p)}>Create</button>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button onClick={() => onDelete(p._id)}>Delete</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table> 
       </>
      
      
    );
  };
  
  export default ProductTable;
  