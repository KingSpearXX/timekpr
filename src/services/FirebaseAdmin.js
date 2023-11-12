const fbAdmin = {
    listAllUsers: async () => {
        console.log(process.env.VUE_APP_SERVICEMASTER_URL);
        const response = await fetch(`${process.env.VUE_APP_SERVICEMASTER_URL}/firebaseadmin/listallusers`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            return data;
        })
        return response ;
    },
}

export default fbAdmin;