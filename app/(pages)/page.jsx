import { redirect } from "next/navigation";
const page = () => {
  redirect("/sign-in");
  return <div></div>;
};

export default page;
