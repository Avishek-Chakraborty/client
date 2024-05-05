/* eslint-disable @typescript-eslint/ban-types */
import DashboardBox from "@/components/DashboardBox";

type Props = {};

const RowOne = (props: Props) => {
	return (
		<>
			<DashboardBox gridArea="a" />
			<DashboardBox gridArea="b" />
			<DashboardBox gridArea="c" />
		</>
	);
};

export default RowOne;
