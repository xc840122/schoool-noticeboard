import { redirect } from "next/navigation";
// Temperary redirect to /messages for
const Home = () => {
  redirect("/notice");
};
export default Home;