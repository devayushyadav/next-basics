async function getUsers(id) {
    let data = await fetch(`http://localhost:3000/api/users/${id}`)
    data = await data.json()
    return data.resp
}

const Page = async ({params}) => {

    const user = await getUsers(params.userId)

    console.log(user)

    return (<div>
        <h1>User Details</h1>
        <div>
            Name : {user.name}
        </div>
        <div>
            Email : {user.email}
        </div>
        <div>
            Username : {user.username}
        </div>
        <div>
            Phone : {user.phone}
        </div>

    </div>)

}

export default Page