import React from "react";
import CustomOutlineButton from "../shared/CustomOutlineButton";

interface CardProps {
	imageSrc: string;
	title: string;
	description: string;
	buttonText: string;
	containerClasses?: string;
	imageClasses?: string;
	titleClasses?: string;
	descriptionClasses?: string;
	buttonClasses?: string;
	comingSoon?: boolean;
}

const CarousalCard: React.FC<CardProps> = ({
	imageSrc,
	title,
	description,
	buttonText,
	containerClasses = "",
	imageClasses = "",
	titleClasses = "",
	descriptionClasses = "",
	buttonClasses = "",
	comingSoon,
}) => {
	return (
		<div className={`w-auto md:w-[461px] ${containerClasses}`}>
			<div className="relative">
				<img
					className={`w-[300px] h-[300px] object-contain rounded-3xl md:object-cover ${
						comingSoon ? "object-fill" : ""
					} md:w-full ${comingSoon ? "filter grayscale" : ""} ${imageClasses}`}
					src={imageSrc}
					alt="Card Image"
				/>
				{comingSoon && (
					<div
						className="absolute top-4 right-4 bg-white bg-opacity-90 text-su_primary_bg font-semibold font-Urbanist text-xs md:text-sm py-1 px-2 rounded-lg"
					>
						Coming soon
					</div>
				)}
			</div>
			<p className={`w-[300px] text-su_primary_bg font-semibold font-Urbanist text-lg md:w-[401px] md:text-2xl mt-4 ${titleClasses}`}>
				{title}
			</p>
			<p className={`w-[300px] mb-2 text-su_primary_black font-Urbanist font-normal text-xs md:text-sm mt-1 md:w-[401px] ${descriptionClasses}`}>
				{description}
			</p>
			<CustomOutlineButton
				className={`px-2 md:px-6 py-2 md:py-2 font-Urbanist ${
					comingSoon ? "!bg-su_greyed_bg text-su_greyed !border-transparent" : "!bg-su_primary !text-su_primary_bg"
				} font-bold text-xs md:text-sm ${buttonClasses}`} style={comingSoon? {background:"none"}:{}}
			>
				{buttonText}
			</CustomOutlineButton>
		</div>
	);
};

export default CarousalCard;
