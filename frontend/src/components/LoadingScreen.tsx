import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const LoadingScreen = () => {
    return (
        <div className="flex justify-center">
            <ColorRing
                height="120"
                width="120"
            />
        </div>
    )
}

export default LoadingScreen