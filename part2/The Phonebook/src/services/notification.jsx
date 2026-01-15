const Notification = ({msg}) => {
    const msg_style = {
        color: 'green',
        border: '3px solid green',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
        fontSize: '25px',
        padding: '3px'
    }

    const error_style = {
        color: 'red',
        border: '3px solid red',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
        fontSize: '25px',
        padding: '3px'
    }

    if (msg === null){ 
        return null
    } else if (msg.includes('Added')){
    return (
        <div style={msg_style}>{msg}</div>
    )} else {
    return (
        <div style={error_style}>{msg}</div>
    )
}

}

export default Notification