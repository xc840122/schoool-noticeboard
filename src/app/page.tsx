import { redirect } from "next/navigation";

const Home = () => {
  redirect("/messages");
};
export default Home;