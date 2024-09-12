'use client'
import { useRouter } from "next/navigation"; 

const styles ={
    action: {
        border:'2px solid red',
        padding: '0.20rem',
        borderRadius: '4px',
        borderBottom: "1px solid #CBD5E0",
        cursor:'pointer'
      },
}
const DeleteProduct =  ({productId}) => {

    const router = useRouter()
    
    const handleDeleteProduct = async () => {
        confirm('Are you sure you want to delete this product')

        let resp = await fetch(`/api/products/${productId}`,{
            method: 'DELETE',
        })

        resp = await resp.json()

        if(resp.success) {
            alert('Product deleted successfully')
            router.push("/products");
        }
        else {
            alert(resp.error)
        }
    }

    return <button style={styles.action} onClick={()=>handleDeleteProduct()}>Delete</button>
}

export default DeleteProduct