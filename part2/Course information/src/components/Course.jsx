const Course = ({course}) => {
  console.log('work')
  return( <div>
    <Header name = {course.name} />
    <Content parts = {course.parts} />
    <Footer parts={course.parts} />
    </div>
  )
}

const Header = ( {name} ) => <h1>{name}</h1>

const Content = ( {parts} ) => {
  return (
    <>
    {parts.map(part => <Part key={part.id} part= {part} />)}
      </>
  )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

// const Footer = ({parts}) => {
//   let total = 0
//   parts.map(part => total += part.exercises)
//   return(
//     <p>total of {total} exercises</p>
//   )
// }

const Footer = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};


export default Course


