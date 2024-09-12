import DeleteProduct from "@/components/DeleteProduct/DeleteProduct";
import Link from "next/link";

async function getProducts() {
    let resp = await fetch('http://localhost:3000/api/products')
    resp = await resp.json()
    if(resp.success){
      return resp.result
    }else{
      return {success: false}
    }
}

  // Inline CSS styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "#F0F4F8",
      minHeight: "100vh",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      color: "#2B6CB0",
    },
    table: {
      width: "100%",
      maxWidth: "800px",
      borderCollapse: "collapse",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#FFFFFF",
    },
    th: {
      backgroundColor: "#3182CE",
      color: "#FFFFFF",
      padding: "0.75rem",
      textAlign: "left",
      fontSize: "1rem",
    },
    td: {
      padding: "0.75rem",
      borderBottom: "1px solid #CBD5E0",
      color: "#4A5568",
      fontSize: "0.95rem",
    },
    action: {
      border:'2px solid blue',
      padding: '0.20rem',
      borderRadius: '4px',
      borderBottom: "1px solid #CBD5E0",
    },
    rowHover: {
      backgroundColor: "#EBF8FF",
      transition: "background-color 0.3s",
    },
  };

const Page = async () => {

    const products = await getProducts()

    return (    <div style={styles.container}>
      <h1 style={styles.header}>Product List</h1>
      <Link href={'/add-product'}>Add Product</Link>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Color</th>
            <th style={styles.th}>Company</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return <tr
              key={product._id}
              style={{ cursor: "pointer" }}
              // onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor)}
              // onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.price}</td>
              <td style={styles.td}>{product.category}</td>
              <td style={styles.td}>{product.color}</td>
              <td style={styles.td}>{product.company}</td>
              <td style={styles.td}>
                <Link href={`/products/${product._id}`} style={styles.action}>Edit</Link>
                <DeleteProduct productId={product._id} />
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>)

}

export default Page