const postCustomer = async (data, paramsLink) => {
    let link = "http://localhost:3000/"
    if (paramsLink) {
        link += paramsLink
    }

    try {
        let request = await fetch(link, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {'content-type': 'application/json'}
        })
        return await request.json();
    } catch (err) {
        throw new Error(err)
    }
}

export default postCustomer