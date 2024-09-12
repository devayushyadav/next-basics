"use client";

import { useState, useEffect } from "react";

// Mock data to simulate product listing
const mockProducts = [
  { id: 1, name: "Product 1", price: "$50", category: "Electronics", color: "Red", company: "Company A" },
  { id: 2, name: "Product 2", price: "$75", category: "Fashion", color: "Blue", company: "Company B" },
  { id: 3, name: "Product 3", price: "$120", category: "Home", color: "Green", company: "Company C" },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Simulate fetching data
  useEffect(() => {

    const getProducts = async () => {
        let resp = await fetch('http://localhost:3000/api/products')
        resp = await resp.json()

        if(resp.success){
            setProducts(resp.result)
        }
        if(resp.error){
            alert(resp.error)
        }

    }
    getProducts()
  }, []);

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
    rowHover: {
      backgroundColor: "#EBF8FF",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Product List</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Color</th>
            <th style={styles.th}>Company</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.price}</td>
              <td style={styles.td}>{product.category}</td>
              <td style={styles.td}>{product.color}</td>
              <td style={styles.td}>{product.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
