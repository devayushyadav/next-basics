"use client";

import { useRouter } from "next/navigation"; 
import { useState } from "react";

const ProductForm = () => {
    const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    color: "",
    company: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

        let resp =await fetch('http://localhost:3000/api/products',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
  
        })

        resp = await resp.json()

        if(resp.success){
            alert('Product has been created successfully')
            setFormData({
                name: "",
                price: "",
                category: "",
                color: "",
                company: "",
            })
            router.push("/products");
        }
        if(resp.error){
            alert(resp.error)
            setFormData({
                name: "",
                price: "",
                category: "",
                color: "",
                company: "",
            })
            return
        }
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #EBF8FF, #F7FAFC)',
    },
    form: {
      background: '#FFFFFF',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    header: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      textAlign: 'center',
      color: '#3182CE',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#4A5568',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #CBD5E0',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputFocus: {
      borderColor: '#63B3ED',
      boxShadow: '0 0 0 3px rgba(99, 179, 237, 0.3)',
    },
    errorMessage: {
      color: '#E53E3E',
      fontSize: '0.875rem',
      marginTop: '-0.75rem',
      marginBottom: '1rem',
    },
    button: {
      width: '100%',
      backgroundColor: '#3182CE',
      color: '#FFFFFF',
      fontWeight: '600',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
    },
    buttonHover: {
      backgroundColor: '#2B6CB0',
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >
        <h1 style={styles.header}>Add Product</h1>

        {["name", "price", "category", "color", "company"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              style={styles.label}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors[field] ? { borderColor: '#E53E3E' } : {}),
              }}
              placeholder={`Enter ${field}`}
            />
            {errors[field] && (
              <p style={styles.errorMessage}>{errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style = { ...styles.button, ...styles.buttonHover })}
          onMouseLeave={(e) => (e.currentTarget.style = styles.button)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
