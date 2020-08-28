import React from 'react'

export default class CurrentLayerControls extends React.Component {
    render() {
        return (
            <div className="sound-select"><p>Sound Select</p>
                <form>
                    <select type="select">
                        <option>Default Option</option>
                    </select>
                </form>
            </div>
        )
    }
}
