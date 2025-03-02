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
  const [texts, setTexts] = useState([""]);
  const [topics, setTopics] = useState([""]);
  const [showFilters, setShowFilters] = useState(true);

  function toggleFilter() {
    if (!texts[0] || !texts[1] || !topics[0] || !topics[1]) {
      return true;
    }
    return false;
  }

  function createInputTextField() {
    if (texts.length < 3) {
      const arr = [...texts, ""];
      setTexts(arr);
    }
  }
  function createInputTopicField() {
    if (topics.length < 3) {
      const arr = [...topics, ""];
      setTopics(arr);
    }
  }
  function handleTopicInputChange(index, value) {
    const myTexts = [...topics];
    myTexts[index] = value;
    setTopics(myTexts);
  }

  function handleTextInputChange(index, value) {
    const myTexts = [...texts];
    myTexts[index] = value;
    setTexts(myTexts);
  }

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
          type={toggleFilter() ? "disabled" : null}
          handleClick={() => setShowFilters(!showFilters)}
          icon={
            <div className="">
              <img src="/pages-icon/filter.svg" className="w-full" />
            </div>
          }
        />
      </div>
      {showFilters && (
        <ManagementPanel>
          <Section text={"Topics"}>
            {topics.map((topic, idx) => {
              if (idx === topics.length - 1) {
                return (
                  <div className="flex items-center gap-10" key={idx}>
                    <Input
                      value={topic}
                      id={idx}
                      handleChange={handleTopicInputChange}
                    />
                    <div className="w-16 text-white relative top-3">
                      <VarButton
                        text={"+"}
                        small={true}
                        type={topics.length >= 3 ? "disabled" : null}
                        handleClick={createInputTopicField}
                      />
                    </div>
                  </div>
                );
              }
              return (
                <Input
                  value={topic}
                  key={idx}
                  id={idx}
                  handleChange={handleTopicInputChange}
                />
              );
            })}
          </Section>

          <Section text={"Texts"}>
            {texts.map((text, idx) => {
              if (idx === texts.length - 1) {
                return (
                  <div className="flex items-center gap-10" key={idx}>
                    <Input
                      value={text}
                      id={idx}
                      handleChange={handleTextInputChange}
                    />
                    <div className="w-16 text-white relative top-3">
                      <VarButton
                        text={"+"}
                        small={true}
                        type={texts.length >= 3 ? "disabled" : null}
                        handleClick={createInputTextField}
                      />
                    </div>
                  </div>
                );
              }
              return (
                <Input
                  value={text}
                  key={idx}
                  id={idx}
                  handleChange={handleTextInputChange}
                />
              );
            })}
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
          <VarButton text="Generate" type={"disabled"} />
        </ManagementPanel>
      )}{" "}
    </>
  );
}

export default Posts;
