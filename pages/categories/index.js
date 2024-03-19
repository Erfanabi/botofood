import CategoriesPage from "../../components/templates/CategoriesPage";

function Categories({ data }) {
  return <CategoriesPage data={data} />;
}

export default Categories;

export async function getServerSideProps(context) {
  const {
    query: { difficulty, time },
  } = context;

  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();

  var filteredDifficulty = [];
  if (difficulty == "") {
    filteredDifficulty = [...data];
  } else {
    filteredDifficulty = data.filter((item) => {
      return item.details[2]["Difficulty"] == difficulty;
    });
  }

  var filteredTime = [];
  if (time == "") {
    filteredTime = [...data];
  } else if (time == "more") {
    filteredTime = data.filter((item) => {
      return item.details[4]["Cooking Time"].split(" ")[0] > 30;
    });
  } else if (time == "less") {
    filteredTime = data.filter((item) => {
      return item.details[4]["Cooking Time"].split(" ")[0] <= 30;
    });
  }

  const commonElements = filteredDifficulty.filter((item) =>
    filteredTime.includes(item)
  );

  return { props: { data: commonElements } };
}

// const filteredData = data.map((item) => {
//   return { id: item.id, difficulty: item.details[2]["Difficulty"] };
// });
