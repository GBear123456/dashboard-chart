import UseFirestore, { UseGetFireStore } from "../hooks/useFilestore"

var TestService = {
    filter(data) {
        return new Promise((resolve, reject) => {
            try {
                console.log("testService => called firesotre");
            let docs = UseGetFireStore('dash_data', data)
                resolve(docs);
            } catch (error) {
                reject(error);
            }
        })
    }
}
export default TestService;