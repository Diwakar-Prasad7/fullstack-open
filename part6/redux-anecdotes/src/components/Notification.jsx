import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const msg = useSelector(state => state.notification)

  if (!msg) return null

  return <div style={style}>{msg}</div>
}

export default Notification
