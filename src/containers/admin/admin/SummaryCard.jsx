import React from 'react'


const SummaryCard = ({ title, perc = 0, count, state, style, color }) => {
    const styles = {
        card: {
            height: 170,
            boxShadow: "-3px 3px 2px 5px #f2f2f2",
            marginTop: 15,
            marginBottom: 15

        }
    }

    return (
        <div style={{ ...styles.card, ...style }} className="bg-white padd20">

            <h3 className="font18 margin20-bottom bold">
                {title}
            </h3>
            <div className="flex-between margin20-bottom">
                <div className="font30" style={{ color }}>
                    {
                        state === "inc" ? <i className="fa fa-arrow-up margin5-right" style={{ color }}></i>
                            : <i className="fa fa-arrow-down margin5-right" style={{ color }}></i>
                    }

                    {count}</div>
                <div className="font16">{perc}%</div>
            </div>
            <div
                className="flex-between">
                <div style={{
                    height: 5, backgroundColor: color, width: `${perc}%`, boxShadow: "0px 6px 16px 1px " + color
                }}></div>
                <div style={{ height: 5, backgroundColor: "#f2f2f2", width: `${100 - perc}%` }}></div>
            </div>

        </div>
    )
}

export default SummaryCard;