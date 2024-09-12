import { users } from "@/app/utilities/db";
import { NextResponse } from "next/server";

export const GET = async (request,content) => {

  const existence  = users.findIndex(user => user.id == content.params.userId )

    return NextResponse.json({
      resp : existence != -1 ? users[existence] : "No users found" 
    },{status:200});
  };
  

export async function PUT(request, content) {
  try {
    // Parse the JSON body of the request
    const existence  = users.findIndex(user => user.id == content.params.userId )

    if(existence !== -1){

      let {name , email , username, phone} = await request.json();
  
      // Example processing: Here, we're just passing the payload back
      const user = {
        name : name ?? users[existence].name,
        email : email ?? users[existence].email,
        username: username ?? users[existence].username,
        phone : phone ?? users[existence].phone
      }; // Modify this based on your actual logic
  
      // Return a successful JSON response
      return NextResponse.json(user, {
        status: 200,
      });
      
    }

          // Return a 400 Bad Request response if JSON parsing fails
          return NextResponse.json(
            { error: 'User Not found' },
            { status: 400 }
          );


  } catch (error) {
    // Catch JSON parsing errors and respond with an appropriate error message
    console.error('Error parsing JSON:', error.message);
    
    // Return a 400 Bad Request response if JSON parsing fails
    return NextResponse.json(
      { error: 'Invalid JSON format in the request body' },
      { status: 400 }
    );
  }
}

export const DELETE = async (request, content) => {
  try {
    // Parse the JSON body of the request
    const existence  = users.findIndex(user => user.id == content.params.userId )

    if(existence !== -1){

      return NextResponse.json(
        { message: 'User Deleted' },
        { status: 200 }
      );

    }

    // Return a 400 Bad Request response if JSON parsing fails
    return NextResponse.json(
      { error: 'User Not found' },
      { status: 400 }
    );


  } catch (error) {
    // Catch JSON parsing errors and respond with an appropriate error message
    console.error('Error parsing JSON:', error.message);
    
    // Return a 400 Bad Request response if JSON parsing fails
    return NextResponse.json(
      { error: 'Invalid JSON format in the request body' },
      { status: 400 }
    );
  }
}