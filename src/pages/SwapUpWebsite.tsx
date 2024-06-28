import { Button } from "@/components/ui/button";
import LogoButton from "@/components/custom/landing-page/logo-button";
import CommunityCard from "@/components/custom/landing-page/community-card";
import VerticalDivider from "@/components/custom/landing-page/vertical-divider";
import HorizontalDivider from "@/components/custom/landing-page/horizontal-divider";
import LpNavbar from "@/components/custom/landing-page/lp-navbar";
import { communityCardDetails } from "@/constants/data";
import CarousalCard from "@/components/custom/landing-page/carousal-card";
import Testimonial from "@/components/custom/landing-page/testimonial";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const SwapUpPage = () => {
	return (
        
		<div> 
            
			<div
                
				className="h-auto  bg-cover bg-center w-full"
				style={{
					backgroundImage: "url('/assets/landing-page/background1.png')",
				}}
			> {/* Section 1 */}
				<LpNavbar />
				<div className="container mx-auto mt-16 px-2 md:px-10">
					<div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mt-4">
						<div className="max-w-[797px] md:mr-8">
							<p className="text-4xl font-Poppins md:text-7xl font-semibold text-left mt-12 text-su_primary">
								Secure Way To Trade{" "}
								<span className="px-3 py-1 rounded-full bg-su_tea_green text-black inline-block ml-2">
									Assets
								</span>{" "}
								Digitally
							</p>
							<p className="text-su_primary_light mt-8 max-w-[450px] font-Urbanist text-base md:text-lg font-medium leading-relaxed text-left">
								SwapUp is a decentralized application using blockchain and smart
								contract technology to allow users to engage in peer-to-peer
								agreements with others locally and worldwide.
							</p>
							<div className="mt-8">
								<Button>Go to dApp</Button>
							</div>
						</div>
						<div className="w-full max-w-[450px] mt-8 md:mt-0">
							<img
								src="/assets/landing-page/photoroom.png"
								alt="photoroom"
								className="object-contain mx-auto"
							/>
						</div>
					</div>

					<div className="flex justify-start w-full mt-16 pb-16 overflow-x-auto md:justify-center">
						<div className="flex space-x-4 md:space-x-2">
							<LogoButton imgSrc="/assets/landing-page/ethereum.png" />
							<LogoButton imgSrc="/assets/landing-page/base.png" />
							<LogoButton imgSrc="/assets/landing-page/alchemy.png" />
							<LogoButton imgSrc="/assets/landing-page/solana.png" />
							<LogoButton imgSrc="/assets/landing-page/polygon.png" />
						</div>
					</div>
				</div>
			</div>

			<div>
				<div
					className="h-[auto] bg-cover bg-center w-full"
					style={{
						backgroundImage: "url('/assets/landing-page/background2.png')",
					}}
				> {/* Section 2 */}
					<div className="container mx-auto px-2 md:px-10">
						<div className="flex flex-col md:flex-row items-center md:justify-center">
							<div className="max-w-[auto] mt-12">
								<p className="text-su_primary text-4xl font-Poppins md:text-5xl font-semibold text-center mt-12 ">
									Empowering{""}
									<span className="px-3 py-1 rounded-full bg-su_buttermilk text-black inline-block ml-2">
										Diversity
									</span>
								</p>
								<p className="text-su_primary_light mt-8 max-w-[650px] font-Urbanist text-center  md:text-lg font-medium leading-relaxed ">
									Our platform is tailored to serve a diverse community of users
									with a wide range of use cases. Swap what you want, how you
									want..
								</p>
							</div>
						</div>
						<div className="flex justify-center w-full mt-16 mb-16">
							<div className="flex flex-col lg:flex-row md:space-y-0 md:space-x-4 ">
								<CommunityCard
									number="01"
									title="Traders"
									description={
										"Trade assets on multiple blockchains and diversify your NFT exposure."
									}
								/>
								<CommunityCard
									number="02"
									title="Collectors"
									description={
										"Collect your forever NFTs and grow the collections you love."
									}
								/>
								<CommunityCard
									number="03"
									title="Projects"
									comingSoon
									description={
										"Showcase your project, gain new followers, and grow your community using our platform."
									}
								/>
								<CommunityCard
									number="04"
									title="Commerce"
									comingSoon
									description={
										"Use our innovative applications for all your personal commerce needs."
									}
								/>
							</div>
						</div>

						<div className="w-full mt-12 mb-20 flex flex-col lg:flex-row justify-between">
							<div>
								<p className="text-su_primary text-4xl font-Poppins md:text-5xl font-semibold text-center mt-12 lg:text-left">
									We are{" "}
									<span className="px-3 py-1 rounded-full bg-su_light_purple text-su_primary_bg inline-block">
										Growing!
									</span>
								</p>
								<p className="text-su_primary_light mt-6 max-w-[482px] font-Urbanist text-center  lg:text-left text-md font-medium leading-relaxed ">
									Be part of our community and help us grow a secure ecosystem
									for peer-to-peer transactions.
								</p>
							</div>
							<div className="flex justify-center items-center mt-4">
								<div className="flex flex-col  max-w-[680px] mt-10 h-auto justify-between space-x-4 lg:flex-row md:mt-0">
									<div className="text-center max-w-[194px]">
										<p className="font-Poppins text-5xl font-semibold">7500</p>
										<p className="font-Urbanist text-xs mt-4">
											Smart contract calls
										</p>
									</div>
									<div className="hidden md:block">
										<VerticalDivider />
									</div>

									<div className="h-px w-40 mt-4 mb-4 block lg:hidden">
										<HorizontalDivider />
									</div>

									<div className="text-center max-w-[194px]">
										<p className="font-Poppins text-5xl font-semibold">$</p>
										<p className="font-Urbanist text-xs mt-4">
											SwapUp DAO Rewards
										</p>
									</div>
									<div className="hidden md:block">
										<VerticalDivider />
									</div>
									<div className="h-px w-40 mt-4 mb-4 block lg:hidden">
										<HorizontalDivider />
									</div>

									<div className="text-center max-w-[194px]">
										<p className="font-Poppins text-5xl font-semibold">550</p>
										<p className="font-Urbanist text-xs mt-4">
											Number of active users
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="h-[auto] bg-cover bg-center w-full"
				style={{
					backgroundImage: "url('/assets/landing-page/background3.png')",
				}}
			> {/* Section 3 */}
				<div className="container px-0 md:px-10 mx-auto mt-12 flex justify-center">
					<div className="w-full rounded-none md:rounded-3xl bg-su_primary px-2 py-10 md:px-28 md:py-16 mb-10">
						<div className="flex justify-center max-w[850px]">
							<div className="max-w-[850px]  mt-0 md:mt-12">
								<p className="text-4xl text-start  font-Poppins md:text-5xl text-su_primary_bg font-semibold md:text-center mt-12 ">
									<span className="px-3 py-3 rounded-full bg-su_light_pink text-su_primary_bg inline-block">
										Unlocking
									</span>{" "}
									Platform Potential
								</p>
								<p className="text-su_primary_black mt-8 max-w-[700px]  font-Urbanist text-start md:text-center md:text-lg font-medium leading-relaxed ">
									We are always building useful technology to expand peer to
									peer trading. Stay informed on the functionality our
									application currently offers, and more to come in the future.
								</p>
							</div>
						</div>
						<ScrollArea>
							<div className="mt-16 mb-16 w-full flex justify-start overflow-x-auto">
								<div className="flex space-x-2 md:space-x-10">
									<CarousalCard
										imageSrc="/assets/landing-page/carousal1.png"
										title="Exchange NFT's and Crypto On Multiple Networks"
										description="Create the perfect trade between you and your peers using a customizable swap agreement to pick the right amount of NFT's and crypto to make a fair trade."
										buttonText="Find out more"
									/>
									<CarousalCard
										imageSrc="/assets/landing-page/carousal2.png"
										title="Project Hub"
										description="A place for projects to enhance community engagement and reach a wider audience using our core smart contracts and application functionality."
										buttonText="Find out more"
										comingSoon
									/>
									<CarousalCard
										imageSrc="/assets/landing-page/carousal3.png"
										title="Communty Rewards"
										description="Establish a DAO to reward users and Projects who help grow the community and promote a safe platform for users to trade assets."
										buttonText="Find out more"
										comingSoon
									/>
								</div>
							</div>
							<ScrollBar orientation="horizontal" className="h-2" />
						</ScrollArea>
					</div>
				</div>
			</div>
			<div
				className="h-[auto] bg-cover bg-center w-full"
				style={{
					backgroundImage: "url('/assets/landing-page/background4.png')",
				}}
			> {/* Section 4 */}
				<div className="container mx-auto px-2 md:px-10">
					<div className="flex flex-col md:flex-row items-center md:justify-center">
						<div className="max-w-[auto] mt-12">
							<p className="text-su_primary text-4xl font-Poppins md:text-5xl font-semibold text-start md:text-center mt-12 ">
								Foundations of Our
								<span className="px-3 py-1 rounded-full bg-su_tea_green text-black inline-block ml-2">
									Success
								</span>
							</p>
							<p className="text-su_primary_light mt-8 max-w-[650px] font-Urbanist text-start md:text-center  md:text-lg font-medium leading-relaxed ">
								Empowering progress with cutting-edge solutions: discover the
								technologies behind our platform's success.
							</p>
						</div>
					</div>
					<div className="w-full mt-12 mb-14">
						<div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 mb-0 md:mb-5">
							{communityCardDetails
								.slice(0, 3)
								.map((communityCardDetail, index) => (
									<CommunityCard
										key={index}
										icon={communityCardDetail.src}
										title={communityCardDetail.title}
										description={communityCardDetail.desc}
									/>
								))}
						</div>
						<div className="grid grid-cols-1 md:grid-cols-4 md:gap-5 mb-0 md:mb-5">
							{communityCardDetails
								.slice(3, 7)
								.map((communityCardDetail, index) => (
									<CommunityCard
										key={index}
										icon={communityCardDetail.src}
										title={communityCardDetail.title}
										description={communityCardDetail.desc}
									/>
								))}
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
							{communityCardDetails
								.slice(7, 10)
								.map((communityCardDetail, index) => (
									<CommunityCard
										key={index}
										icon={communityCardDetail.src}
										title={communityCardDetail.title}
										description={communityCardDetail.desc}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
			<div
				className="h-[auto] bg-cover bg-center w-full "
				style={{
					backgroundImage: "url('/assets/landing-page/background5.png')",
				}}
			> {/* Section 5 */}
				<div className="container mx-auto px-2 md:px-10 space-y-20">
					<div className="flex flex-col md:flex-row items-center md:justify-center">
						<div className="max-w-[auto] mt-12">
							<p className="text-su_primary text-4xl font-Poppins md:text-5xl font-semibold text-start md:text-center mt-12 ">
								Celebrating
								<span className="px-3 py-1 rounded-full bg-su_buttermilk text-black inline-block ml-2">
									Success
								</span>{" "}
								Stories
							</p>
							<p className="text-su_primary_light mt-8 max-w-[650px] font-Urbanist text-start md:text-center  md:text-lg font-medium leading-relaxed ">
								Step into the world of SwapUp through the eyes of our users.
								Discover their experiences, insights, and the impact SwapUp has
								made on their lives and businesses.
							</p>
						</div>
					</div>

					<ScrollArea className="w-full mb-20 py-6">
						<div className="w-full flex justify-start overflow-x-auto space-x-5">
							<Testimonial
								rating={5}
								text="I've been relying on this platform for several months now, and
								it has truly been a game-changer. Its seamless operation and
								attentive customer service have simplified my transactions and
								saved me valuable time."
								author="Emily J."
								containerClasses="w-[340px]"
							/>
							<div>
								<VerticalDivider />
							</div>

							<Testimonial
								rating={5}
								text="Using this platform has been a revelation for me. I've relied on it for months now, and it continues to exceed my expectations. From its smooth functionality to the exceptional customer support, it truly sets the standard in its industry."
								author="Emily J."
								containerClasses="w-[340px]"
							/>

							<div>
								<VerticalDivider />
							</div>

							<Testimonial
								rating={5}
								text="For the past several months, I've been utilizing this platform, and it has truly transformed the way I handle transactions. Its intuitive design and impeccable customer service have made it an indispensable tool in my daily routine."
								author="Emily J."
								containerClasses="w-[340px]"
							/>

							<div>
								<VerticalDivider />
							</div>

							<Testimonial
								rating={5}
								text="I can't speak highly enough of this platform. It has revolutionized the way I conduct transactions, and I've been a loyal user for months. The seamless experience and unparalleled customer service have set it apart from its competitors."
								author="Emily J."
								containerClasses="w-[340px]"
							/>
						</div>
						<ScrollBar orientation="horizontal" className=" h-2" />
					</ScrollArea>

					<p className="font-Urbanist text-sm text-su_primary_lighter text-center">
						Ready to share your experience?
						<span className="font-Urbanist text-sm text-su_primary">
							{"  "}Leave your feedback
						</span>
					</p>
				</div>

				{/* <div
					className="h-[auto] bg-cover bg-center w-full mt-20"
					style={{
						backgroundImage: "url('/assets/landing-page/background6.png')",
					}}
				>
					<div className="container px-0 md:px-10 mx-auto mt-12 flex justify-center">
						<div className="w-full rounded-none md:rounded-3xl bg-su_primary px-2 py-10 md:px-28 md:py-16">
							<div className="flex justify-center max-w[850px]">
								<div className="max-w-[850px]  mt-0 md:mt-12">
									<p className="text-4xl text-start  font-Poppins md:text-5xl text-su_primary_bg font-semibold md:text-center mt-12 ">
										Key Development{" "}
										<span className="px-3 py-1 rounded-full bg-su_light_purple text-su_primary_bg inline-block">
											Roadmap
										</span>
									</p>
									<p className="text-su_primary_black mt-8 max-w-[700px]  font-Urbanist text-start md:text-center md:text-lg font-medium leading-relaxed ">
										Discover the exciting journey ahead with our comprehensive
										roadmap, tailored to elevate your experience.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default SwapUpPage;
