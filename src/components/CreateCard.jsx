import { useState } from "react";

const CreateCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    start: "",
    due: "",
    list: "todo",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getIdList = async (list) => {
    // list = "todo";
    const response = await fetch(
      `https://api.trello.com/1/boards/sFtFpXVh/lists?key=${
        import.meta.env.VITE_API_KEY
      }&token=${import.meta.env.VITE_TOKEN_KEY}`
    );
    const getListArray = await response.json();
    const result = getListArray.find((item) => {
      return item.name.toLowerCase().replace(/\s+/g, "") === list;
    });
    if (result) {
      return result.id;
    } else {
      console.log("Error in finding the data");
    }
  };

  const handleCreateCard = async () => {
    try {
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
        const data = await response.json();
        setFormData({ name: "", desc: "", start: "", due: "", list: "todo" });
        console.log(data);
      } else {
        console.log("error in getting the response");
      }
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div className="card-container">
      <div className="inputs">
        <div className="input-tab">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name">Desc</label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name">Start</label>
          <input
            type="date"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name">Due</label>
          <input
            type="date"
            name="due"
            value={formData.due}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-tab">
          <label htmlFor="name">List</label>
          <select
            name="list"
            value={formData.list}
            onChange={handleInputChange}
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="input-tab">
          <button onClick={handleCreateCard}>Create Card</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
