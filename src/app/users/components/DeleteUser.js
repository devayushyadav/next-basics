'use client'
const DeleteUser =({id}) => {
    
    const handleDelete =async () => {
        let resp = await fetch(`http://localhost:3000/api/users/${id}`,{
            method:"DELETE"
        })
        resp = await resp.json()
       if(resp.message){
        alert(resp.message)
        return
       }
       if(resp.error){
        alert(resp.error)
        return
       }
    }

    return(
    <button onClick={handleDelete}>
        Delete
    </button>
    )
}

export default DeleteUser