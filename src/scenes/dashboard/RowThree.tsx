/* eslint-disable @typescript-eslint/ban-types */
import DashboardBox from "@/components/DashboardBox";

type Props = {};

const RowThree = (props: Props) => {
	return (
		<>
			<DashboardBox gridArea="g" />
			<DashboardBox gridArea="h" />
			<DashboardBox gridArea="i" />
			<DashboardBox gridArea="j" />
		</>
	);
};

export default RowThree;
