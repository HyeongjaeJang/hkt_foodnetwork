import { Nav } from "../../components/nav";
import Searchbar from "../../components/searchbar";
import Eventsection from "../../components/eventsection";
import Recommendsection from "../../components/recommendsection";

export function Home() {
  return (
    <div className="h-full text-primary">
      <div class={"max-w-xl w-full m-auto"}>
        <Nav />
        <Searchbar />
        <Eventsection />
        <Recommendsection />
      </div>
    </div>
  );
}
