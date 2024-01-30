import React from 'react';

const Confirmation = ({ auctionData }) => {
  return (
		<>
			<h1>Order Confirmed. Payment Processed. Thank You!</h1>
			{/* <div className="cards">
				<div>
					<div
						style={{
							height: '380px',
							width: '300px',
							border: 'black solid 4px',
							margin: '20px',
							backgroundColor: '#def2f1',
							color: 'black',
						}}
					>
						<h3>{auctionData.product.id}</h3>
						<p>{auctionData.product.description}</p>
						<img
							src={auctionData.product.imageUrl}
							style={{ height: '100px', width: '100px' }}
							alt="Product"
						/>
						<h4>Winning Bid: ${auctionData.currentBidPrice}</h4>
						<h5>Bid End: {new Date(auctionData.bidEndTime).toLocaleString()}</h5>
					</div>
				</div>
			</div> */}
		</>
  );
};

export default Confirmation;