/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Layouts

//Components
import { Image } from "antd";
import StandardModal from "../../../../components/modal";
import Label from "../../../../components/fields/input/label";

// Interface
import { IDPictureProps } from "../../../../utils/interfaces";

//Styles
import "./styles.scss";

//Assets

interface IdentificationProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	image: IDPictureProps;
}

export default function Identification({
	open,
	setOpen,
	image,
}: IdentificationProps) {
	return (
		<StandardModal
			header="Identification"
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
							<Image width={300} src={image.front} />
						</div>
						<div className="flex flex-col items-center">
							<Label spanStyling="text-black font-medium text-[16px]">
								Back of ID
							</Label>
							<Image width={300} src={image.back} />
						</div>
					</div>
					<div className="flex flex-col items-center">
						<Label spanStyling="text-black font-medium text-[16px]">
							Selfie with your ID
						</Label>
						<Image width={300} src={image.selfie} />
					</div>
				</div>
			</Image.PreviewGroup>
		</StandardModal>
	);
}
