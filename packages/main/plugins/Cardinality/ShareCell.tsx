import React from 'react';


type ShareProps = {
    share: number;
};

 const ShareCell:React.FC<ShareProps> = ({ share }) => {
    return (
        <div className="cell">
            <div className="c-share-cont">
                <div className="c-progress">
                    <progress value={share} max={100} />
                    <span className="c-share">{share.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
};

export default ShareCell;
