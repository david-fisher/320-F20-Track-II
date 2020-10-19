import React, {useState} from "react";

const alignMiddle = {
  position: 'absolute', 
  left: '50%', 
  top: '50%',
  transform: 'translate(-50%, -50%)',
}

function getQuestions(questionArr){
  let arr = [];
  for(let i = 0; i < questionArr.length; i++){
    let question = questionArr[i];
    arr.push(
      <div>
      <p>{question}</p>
      <textarea rows="4" cols="100" style={{resize: "none"}}></textarea>
      </div>
    )
  }
  return arr;
}

export default function StateTextFields(props) {
  const handleChange = (event) => {
    
  };
  const [testInput1, setTestInput1] = useState("");

  let qAndA =  getQuestions(props.questions).map((question) => <>{question}</>)

  return (
    <div style={alignMiddle}>
      <>{qAndA}</>
    </div>
  );
}
