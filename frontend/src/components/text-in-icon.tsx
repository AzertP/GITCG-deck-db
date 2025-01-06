import './text-in-icon.css'

const TextInIcon = ({icon, text} : {icon: string, text: string}) => {
    return <div className="icon-container">
            <img src={icon} className="top-icon-img"/>
            <div className="text-in-icon">{text}</div>  
    </div>
}

export default TextInIcon