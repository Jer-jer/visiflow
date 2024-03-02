/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Layouts

//Components
import { Image } from "antd";
import StandardModal from "../../../../components/modal";
import Label from "../../../../components/fields/input/label";

//Styles
import "./styles.scss";

//Assets

interface ImageProps {
	frontId: string;
	backId: string;
	selfieId: string;
}

interface IdentificationProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	image: ImageProps;
}

export default function Identification({
	open,
	setOpen,
	image,
}: IdentificationProps) {
	return (
		<StandardModal
			header={
				<span className="text-[22px] text-[#0C0D0D]">Identification</span>
			}
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<Image.PreviewGroup>
				<div className="flex flex-col items-center justify-center gap-[65px]">
					<div className="flex gap-[65px]">
						<div className="flex flex-col items-center">
							<Label spanStyling="text-black font-medium text-[16px]">
								Front of ID
							</Label>
							<Image width={300} src={image.frontId} />
						</div>
						<div className="flex flex-col items-center">
							<Label spanStyling="text-black font-medium text-[16px]">
								Back of ID
							</Label>
							<Image width={300} src={image.backId} />
						</div>
					</div>
					<div className="flex flex-col items-center">
						<Label spanStyling="text-black font-medium text-[16px]">
							Selfie with your ID
						</Label>
						<Image width={300} src={image.selfieId} />
					</div>
				</div>
			</Image.PreviewGroup>
		</StandardModal>
	);
}
