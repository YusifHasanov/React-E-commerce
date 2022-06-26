const getAllCustomers = async () => {
    try {
        let request = await fetch("http://localhost:3000/customers")
        return request.json();
    } catch (err) {
        throw new Error(err)
    }
}



export default getAllCustomers