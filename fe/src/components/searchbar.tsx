import { IconButton, InputBase, Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Search as SearchIcon, FilterAlt } from "@mui/icons-material";
import { useState } from "preact/hooks";
import Filterslide from "./filterslide";
import i18n from "../translations";

type Props = {};

const Searchbar = (props: Props) => {
  const { t } = i18n;
  const [filterBar, setFilterBar] = useState(false);

  const filterBarToggle = () => {
    setFilterBar(!filterBar);
  };

  return (
    <div className={"w-full flex flex-row gap-2"}>
      <Drawer
        anchor={"bottom"}
        open={filterBar}
        onClose={() => setFilterBar(false)}
      >
        {/* @ts-ignore */}
        <Filterslide />
      </Drawer>
      <form className={"flex flex-1 justify-around border rounded-full"}>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: localStorage.getItem("theme") === "light" ? "gray" : "white",
          }}
          placeholder={t("Search Event by Name or Food")}
          inputProps={{ "aria-label": "Search Event by Name or Food" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          {/* @ts-ignore */}
          <SearchIcon />
        </IconButton>
      </form>
      <button
        onClick={filterBarToggle}
        title={"searchFilter"}
        className={"btn btn-square btn-primary text-secondary"}
      >
        <FilterAlt />
      </button>
    </div>
  );
};

export default Searchbar;
