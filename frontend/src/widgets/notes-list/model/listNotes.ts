import noteApi from "../../../entities/note/api/note.api"


export  const listNote = async () => {
    try{
        const response = await noteApi.getAll("notes/")
        return response.data;
    }catch(e) {
        console.error(e)
        throw e
    }
}