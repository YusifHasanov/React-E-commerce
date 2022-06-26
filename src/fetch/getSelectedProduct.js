const getSelectedProduct = async () => {
    try {
        let request = await fetch("http://localhost:3000/selectedProduct")
        return request.json();
    } catch (err) {
        throw new Error(err)
    }
}



export default getSelectedProduct