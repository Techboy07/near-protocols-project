import Pageheading from "../components/PageHeading";
// import TextBox from "../components/TextBox";
import VarButton from "../components/VarButton";

function Posts() {
  return (
    <div>
      <Pageheading text={"Posts"} />
      <div className="w-24">
        <VarButton
          text={"Filter"}
          small
          icon={
            <div className="">
              <img src="/pages-icon/filter.svg" className="w-full" />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Posts;
