import React from "react";

const TrackStatus = ({ data }) => {
    return (
        <div className="track-status">
            <style>
                {`
        .track-status {
  text-align: center;
}

.status-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.status-icon img {
  width: 40px; /* Adjust the width as needed */
  height: 40px; /* Adjust the height as needed */
  margin-right: 10px;
}

.status-details {
  display: flex;
  flex-direction: column;
}

.status-text {
  font-weight: bold;
}

.separator {
  margin: 0 10px;
  color: #888; /* Adjust the color as needed */
}
`}
            </style>
            <ul>
                {data.map((item, index) => (
                    <li key={index} className="status-item">
                        <div className="status-icon">
                            {/* You can replace this with your own icon */}
                            <img src="/assets/images/parcel.png" alt="Status Icon" />
                        </div>
                        <div className="status-details">
                            <p className="status-text">{item.status == "NA" ? "READY TO SHIP" : item.status }</p>
                            <p className="date-text">{item.date}</p>
                        </div>
                        {/* {index < data.length - 1 && <div className="separator">|</div>} */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackStatus;
