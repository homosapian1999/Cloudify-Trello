import { useState } from "react";
import { toast } from "react-toastify";

const CreateCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    start: "",
    due: "",
    list: "todo",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getIdList = async (list) => {
    const response = await fetch(
      `https://api.trello.com/1/boards/${
        import.meta.env.VITE_BOARD
      }/lists?key=${import.meta.env.VITE_API_KEY}&token=${
        import.meta.env.VITE_TOKEN_KEY
      }`
    );
    const getListArray = await response.json();
    const result = getListArray.find((item) => {
      return item.name.toLowerCase().replace(/\s+/g, "") === list;
    });
    if (result) {
      return result.id;
    } else {
      // console.log("Error in finding the data");
      toast.error("Try again");
    }
  };

  const handleCreateCard = async () => {
    try {
      if (
        !formData.name ||
        !formData.desc ||
        !formData.start ||
        !formData.due
      ) {
        toast.warning("Field cannot be empty", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      setIsLoading(true);
      const requestBody = {
        name: formData.name,
        desc: formData.desc,
        start: formData.start,
        due: formData.due,
        list: await getIdList(formData.list),
      };

      const response = await fetch(
        `https://api.trello.com/1/cards?idList=${requestBody.list}&key=${
          import.meta.env.VITE_API_KEY
        }&token=${import.meta.env.VITE_TOKEN_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        toast.success("Card created successfully");
        setFormData({ name: "", desc: "", start: "", due: "", list: "todo" });
      } else {
        // console.log("error in getting the response");
        toast.error("Try again");
      }
    } catch (err) {
      // console.log("error");
      toast.error("Try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-container">
      <div className="input-container">
        <div className="input-tab">
          <label htmlFor="name" className="labels">
            Task:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="inputs"
            placeholder="Enter Text"
            required
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name" className="labels">
            Details:
          </label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            className="inputs"
            placeholder="Enter Details"
            required
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name" className="labels">
            Start:
          </label>
          <input
            type="date"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
            className="inputs"
            required
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name" className="labels">
            Due:
          </label>
          <input
            type="date"
            name="due"
            value={formData.due}
            onChange={handleInputChange}
            className="inputs"
            required
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name" className="labels">
            List:
          </label>
          <select
            name="list"
            value={formData.list}
            onChange={handleInputChange}
            className="dropdown"
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="input-tab">
          <button onClick={handleCreateCard} className="btn">
            {isLoading ? "Creating" : "Create Card"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
