import { useEffect, useState } from 'react'

const HomePage = () => {
    const [showText, setShowText] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowText(false)
        }, 5000)

        setShowText(true)
    }, [])

    return (
        <div className="homepage">
            {showText && (
                <>
                    <div className="title align-items-center">
                        <div className="typed mx-auto">
                            Welcome to the Star Wars Encyclopedia!
                        </div>
                    </div>
                </>
            )}
        </div >
    )
}

export default HomePage;