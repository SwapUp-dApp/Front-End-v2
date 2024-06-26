import { Button } from "@/components/ui/button";
import LogoButton from "@/components/custom/landing_page/logo-button";
import CommunityCard from "@/components/custom/landing_page/community-card";
import VerticalDivider from "@/components/custom/landing_page/vertical-divider";
import HorizontalDivider from "@/components/custom/landing_page/horizontal-divider";
import LpNavbar from "@/components/custom/landing_page/lp-navbar";

const SwapUpPage = () => {
	return (
		<div>
			<div
				className="h-auto  bg-cover bg-center w-full"
				style={{ backgroundImage: "url('/assets/landing-page/background1.png')" }}
			>
				<LpNavbar />
				<div className="container mx-auto mt-16 px-2 md:px-10">
					<div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mt-4">
						<div className="max-w-[797px] md:mr-8">
							<p className="text-4xl font-Poppins md:text-7xl font-semibold text-left mt-12">
								Secure Way To Trade{" "}
								<span className="px-3 py-1 rounded-full bg-[#CFF0CE] text-black inline-block ml-2">
									Assets
								</span>{" "}
								Digitally
							</p>
							<p className="mt-8 max-w-[450px] font-Urbanist text-base md:text-lg font-medium leading-relaxed text-left">
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

					<div className="flex justify-center w-full mt-16 pb-16 overflow-x-auto sm:justify-items-start">
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
				style={{ backgroundImage: "url('/assets/landing-page/background2.png')" }}
			>
				<div className="container mx-auto sm:px-0 md:px-10">
					<div className="flex flex-col md:flex-row items-center md:justify-center">
						<div className="max-w-[auto] mt-12">
							<p className="text-4xl font-Poppins md:text-5xl font-semibold text-center mt-12 ">
								Empowering{""}
								<span className="px-3 py-1 rounded-full bg-[#F7F2BB] text-black inline-block ml-2">
									Diversity
								</span>
							</p>
							<p className="mt-8 max-w-[650px] font-Urbanist text-center  md:text-lg font-medium leading-relaxed ">
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
							<p className="text-4xl font-Poppins md:text-5xl font-semibold text-center mt-12 lg:text-left">
								We are{" "}
								<span className="px-3 py-1 rounded-full bg-[#D0CCF4] text-black inline-block">
									Growing!
								</span>
							</p>
							<p className="mt-6 max-w-[482px] font-Urbanist text-center  lg:text-left text-md font-medium leading-relaxed ">
								Be part of our community and help us grow a secure ecosystem for
								peer-to-peer transactions.
							</p>
						</div>
						<div className="flex justify-center items-center mt-4">
							<div
								className="flex flex-col  max-w-[680px] mt-10 h-auto justify-between space-x-4 lg:flex-row md:mt-0"
								
							>
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
				style={{ backgroundImage: "url('/assets/landing-page/background3.png')" }}
			>
				<div className="container px-0 md:px-10 mx-auto mt-12 flex justify-center">
					<div className="w-full rounded-none md:rounded-3xl bg-white px-2 py-10 md:px-28 md:py-16">
						<div className="flex justify-center max-w[850px]">
							<div className="max-w-[850px]  mt-0 md:mt-12" >
								<p className="text-4xl text-start  font-Poppins md:text-5xl text-black font-semibold md:text-center mt-12 ">
									<span className="px-3 py-1 rounded-full bg-[#f9cff2] text-black inline-block">
									Unlocking
									</span>
									{" "}Platform Potential
								</p>
								<p className="mt-8 max-w-[700px]  font-Urbanist text-start md:text-center text-black md:text-lg font-medium leading-relaxed ">
									We are always building useful technology to expand peer to
									peer trading. Stay informed on the functionality our
									application currently offers, and more to come in the future.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwapUpPage;
