import React, { useEffect } from "react";
import { VictoryPie } from "victory-pie";

const ResultsPage = (props) => {
  const { marks, setMarks, MCqs, setMCqs } = props;
  console.log(MCqs);
  console.log(marks);
  const myData = [
    { x: "Correct", y: marks },
    { x: "Incorrect", y: 4 - marks },
  ];
  useEffect(() => {
    let a = [1, 1, 2, 3, 4];
    console.log(
      a.map((item) => {
        return item;
      })
    );
  }, []);
  return (
    <div>
      <h2>You scored {marks}/4</h2>
      <VictoryPie
        data={myData}
        colorScale={["Green", "Red"]}
        radius={30}
        height={100}
      />
      {MCqs.map((mcq, index) => {
        return (
          <div>
            <p>
              <b>{index + 1}.</b>
              {mcq.question}
            </p>
            {MCqs[index].options.map((items, index) => {
              if (items.isCorrect&&items.isSelected) {
                console.log("cor");
                return (
                  <div>
                    <p> Correct Answer: {items.answerText}</p>
                    
                      <p> Selected Answer: {items.answerText}</p>
                    
                  </div>
                );
              }
              if (items.isSelected) {
                console.log("incor");
                return <p> Selected Answer :{items.answerText}</p>;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ResultsPage;
