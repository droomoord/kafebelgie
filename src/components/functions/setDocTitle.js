import axios from "axios";

const setDocTitle = async () => {
  try {
    const api = await axios.get("/wp-json");
    const { name } = api.data;
    document.title = name.charAt(0).toUpperCase() + name.slice(1);
  } catch (error) {
    console.log(error);
  }
};
export default setDocTitle;
