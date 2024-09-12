import Link from "next/link"
import DeleteUser from "./components/DeleteUser"

async function getUsers() {
    let data = await fetch('http://localhost:3000/api/users')
    data = await data.json()
    return data
}

const Page = async () => {

    const users = await getUsers()

    return (<div>
        <h1>Users List</h1>
        {users && users.length > 0 && users.map((user)=>{
            return <div key={`users-${user.id}`}>
                <Link href={`users/${user.id}`}>
                Name : {user.name}
                </Link>
                <Link href={`users/${user.id}/update-user`}>
                Edit
                </Link>
                <DeleteUser id={user.id}/>
            </div>
        })}
    </div>)

}

export default Page