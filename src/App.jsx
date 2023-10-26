import CreateCard from "./components/CreateCard";

const App = () => {
  // fetch(
  //   `https://api.trello.com/1/boards/sFtFpXVh/lists?key=${
  //     import.meta.env.VITE_API_KEY
  //   }&token=${import.meta.env.VITE_TOKEN_KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  // createCard();
  return (
    <div>
      {/* <h1>Hello</h1>
      <button onClick={createCard}>Click</button> */}
      <CreateCard />
    </div>
  );
};

export default App;
