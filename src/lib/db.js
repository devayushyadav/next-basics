const {username ,password}  = process.env
export const connectionString = `mongodb+srv://ayushyadav:${password}@cluster.4lwtw.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster`