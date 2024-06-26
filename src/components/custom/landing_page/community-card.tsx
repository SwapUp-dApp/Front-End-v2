import React from "react";

interface CommunityCardProps {
	number: string;
	title: string;
	description: String;
	comingSoon?: boolean;
}
const CommunityCard: React.FC<CommunityCardProps> = ({
	number,
	title,
	description,
	comingSoon,
}) => {
	return (
		<div
			className="w-[288px] h-[217px] p-6 rounded-md mb-4 sm:w-full "
			style={{ backgroundColor: "#212036", position: "relative" }}
		>
			{comingSoon ? (
				<div
					className="text-end font-Urbanist font-semibold text-xs"
					style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        borderRadius: "15px",
						width: "95px",
						height: "32px",
						padding: "8px,12px,8px,12px",
						backgroundColor: "#ffff",
						color: "#0D0D23",
						position: "absolute",
						right: "15px",
                        top:"15px"
					}}
				>
					Coming soon
				</div>
			) : (
				<></>
			)}
			<p
				className="font-Urbanist text-base leading-10 mt-2"
				style={{ color: "#FFFFFF4D" }}
			>
				{number}
			</p>
			<p className="font-poppins leading-10 text-xl font-semibold mt-2">
				{title}
			</p>
			<p className="font-Urbanist text-sm" style={{ color: "#FFFFFF4D" }}>
				{description}
			</p>
		</div>
	);
};

export default CommunityCard;
