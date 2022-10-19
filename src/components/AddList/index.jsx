import React, { useState } from "react";
import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({ colors }) => {
	const [visiblePopup, setVisiblePopup] = useState(false);
	const [selectedColor, setSelectedColor] = useState(colors[0].id);

	return (
		<div className="add-list">
			<List onClick={() => setVisiblePopup(true)}
				items={[
					{
						className: 'list__add-button',
						icon: (
							<svg 
								width="16" 
								height="16" 
								viewBox="0 0 16 16" 
								fill="none" 
								xmlns="http://www.w3.org/2000/svg"
							>
								
								<path 
									d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								<path 
									d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						),
						name: 'Добавить список',
					},
				]} 
				isRemoveble
			/>
			{visiblePopup && (
				<div className="add-list__popup">
					<img 
						onClick={() => setVisiblePopup(false)}
						src={closeSvg} 
						alt='close button' 
						className="add-list__popup-close-btn" />
					<input className="field" type="text" placeholder="Название списка" />
					<div className="add-list__popup-colors">
						<ul className="add-list__list">
							{
								colors.map(color => (
									<li>
										<Badge 
											onClick={() => setSelectedColor(color.id)} 
											key={color.hex} 
											color={color.name}
											className={selectedColor === color.id && 'active'}
										/>
									</li>
							))}
						</ul>
					</div>
					<button className="button add-list__button">Добавить</button>
				</div>
			)}
		</div>
	)}

export default AddList;