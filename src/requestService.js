class RequestService {
    static async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return { response, json };
        } catch (error) {
            console.log(error);
        }
    }
}

export default RequestService;
