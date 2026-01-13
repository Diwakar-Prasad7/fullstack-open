import { useState } from 'react'

const App = () => {
  const [goodclicks, setGoodClicks] = useState(0)
  const [neutralclicks, setNeutralClicks] = useState(0)
  const [badclicks, setBadClicks] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    console.log('user clicked on good')
    setGoodClicks(goodclicks + 1)
    setAll(goodclicks + badclicks + neutralclicks + 1)
  }

  const handleNeutralClick = () => {
    console.log('user clicked on neutral')
    setNeutralClicks(neutralclicks + 1)
    setAll(goodclicks + badclicks + neutralclicks + 1)
  }

  const handleBadClick = () => {
    console.log('user clicked on bad')
    setBadClicks(badclicks + 1)
    setAll(goodclicks + badclicks + neutralclicks + 1)
  }
  return (
    <div>
      <h1>Give feedback-</h1>
      <Button text = 'good' onClick={handleGoodClick} />
      <Button text = 'neutral' onClick={handleNeutralClick} />
      <Button text = 'bad' onClick={handleBadClick} />
      <Statistics goodclicks = {goodclicks} neutralclicks = {neutralclicks} badclicks = {badclicks} all = {all} />
    </div>
  )
}

// const Statistics = (props) => {

//   if (props.all === 0){
//     return(
//       <div>
//         <h1>Statistics</h1>
//         <p>No feedback given</p>
//       </div>
//     )
//   }
//   let average = ((props.goodclicks*1 + props.badclicks*-1)/props.all)
//   let positive = ((props.goodclicks/props.all)*100)

//   return (
//     <div>
//       <h1>Statistics</h1>
//       <StaticLine text = 'good' value = {props.goodclicks} />
//       <StaticLine text = 'neutral' value = {props.neutralclicks} />
//       <StaticLine text = 'bad' value = {props.badclicks} />
//       <StaticLine text = 'all' value = {props.all} />
//       <StaticLine text = 'average' value = {average} />
//       <StaticLine text = 'positive' value = {positive} />
//     </div>
//   )
// }

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
// const StaticLine = (props) => <p>{props.text} {props.value}</p>


const Statistics = (props) => {

  if (props.all === 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  let average = ((props.goodclicks*1 + props.badclicks*-1)/props.all)
  let positive = ((props.goodclicks/props.all)*100)

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
      <StaticLine text = 'good' value = {props.goodclicks} />
      <StaticLine text = 'neutral' value = {props.neutralclicks} />
      <StaticLine text = 'bad' value = {props.badclicks} />
      <StaticLine text = 'all' value = {props.all} />
      <StaticLine text = 'average' value = {average} />
      <StaticLine text = 'positive' value = {positive} />
      </tbody>
      </table>
    </div>
  )
}
const StaticLine = (props) => {
  return (
  <tr><td>{props.text}</td>
  <td>{props.value}</td></tr>
)
}
export default App
