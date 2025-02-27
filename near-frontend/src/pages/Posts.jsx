import Pageheading from "../components/PageHeading";
// import TextBox from "../components/TextBox";
import VarButton from "../components/VarButton";
import {
  ManagementPanel,
  Input,
  Radio,
  Section,
  CheckBox,
} from "../components/ManagementPanel";
import { useState } from "react";

function Posts() {
  const [style, setStyle] = useState("proper");
  const [quantifiers, setQuantifiers] = useState(["proper"]);

  function getQuantifiers() {
    let quant = "";
    for (let i = 0; i < quantifiers.length; i++) {
      quant += quantifiers[i] + ", ";
    }
    return quant;
  }
  const Styles = ["proper", "diplomatic", "meticulous", "slightly anxious"];
  const adjectives = ["proper", "diplomatic", "meticulous", "protocol minded"];
  return (
    <>
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
      <ManagementPanel>
        <Section text={"Texts"}>
          <Input />
        </Section>
        <Section text={"Style"} value={style}>
          {Styles.map((value) => {
            return (
              <Radio
                value={value}
                key={value}
                func={() => setStyle(value)}
                selected={style}
              />
            );
          })}
        </Section>
        <Section text={"Quantifiers"} value={getQuantifiers()} last>
          {adjectives.map((value) => {
            return (
              <CheckBox
                value={value}
                key={value}
                selected={quantifiers}
                func={setQuantifiers}
              />
            );
          })}
        </Section>
      </ManagementPanel>
    </>
  );
}

export default Posts;
