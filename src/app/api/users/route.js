// export async function GET(request){
//     return new Response('hello next js new users without arrow')
// }

import { users } from "@/app/utilities/db";
import { NextResponse } from "next/server";

export async function GET(request){
    return NextResponse.json(users,{
        status:200

    }
)
    // return new Response('hello next js new users without arrow')
}

export async function POST(request) {
    try {
      // Parse the JSON body of the request
      let {name , email , username, phone} = await request.json();

      if(!name || !email || !username || !phone){
        return NextResponse.json(
            { error: 'Required field not found' },
            { status: 400 }
          );
      }
  
      // Example processing: Here, we're just passing the payload back
      const user = {
        name,
        email,
        username,
        phone
      }; // Modify this based on your actual logic
  
      // Return a successful JSON response
      return NextResponse.json(user, {
        status: 201,
      });
  
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