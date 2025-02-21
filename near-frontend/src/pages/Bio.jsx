import TextBox from "../components/TextBox";
import PageHeading from "../components/PageHeading";
import VarButton from "../components/VarButton";
import { useState } from "react";

function Bio() {
  const [content, setContent] = useState("Write your content here...");
  return (
    <div>
      <PageHeading text="BIO" />
      <TextBox
        actionBtn={<CircleButton />}
        valueControl={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex  gap-5 mt-8 mb-5">
        <VarButton type={"outlined"} text={"Cancel"} handleClick={() => {}} />
        <VarButton
          type={"filled"}
          text={"Generate"}
          handleClick={() => {
            console.log(content);
          }}
        />
      </div>
      <div>
        <VarButton
          text={"Save for later"}
          handleClick={() => {
            console.log(content);
          }}
        />
      </div>

      <p className="text-center mt-8 font-medium text-[#FEFEFE]">
        Check <span className="text-accent cursor-pointer ">here </span>for
        saved contents
      </p>
    </div>
  );
}

function CircleButton() {
  return (
    <button className="rounded-full bg-action-btn p-3 flex items-center justify-center">
      <img src="/pages-icon/Vector.svg" className="w-5" alt="send-btn-icon" />
    </button>
  );
}
// function TextAreaACtionIcons() {
//   return (
//     <div>
//       <button className="rounded-full bg-action-btn p-2 mb-2">
//         <img
//           src="/pages-icon/Vector(1).svg"
//           alt="action-icon"
//           className="w-4 h-4"
//         />
//       </button>
//       <br />
//       <button className="rounded-full bg-action-btn p-2">
//         <img
//           src="/pages-icon/Vector2.svg"
//           alt="action-icon"
//           className="w-4 h-4"
//         />
//       </button>
//     </div>
//   );
// }

export default Bio;
