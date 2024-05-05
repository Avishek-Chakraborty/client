/* eslint-disable @typescript-eslint/ban-types */
import DashboardBox from "@/components/DashboardBox";

type Props = {};

const RowTwo = (props: Props) => {
	return (
		<>
			<DashboardBox gridArea="d" />
			<DashboardBox gridArea="e" />
			<DashboardBox gridArea="f" />
		</>
	);
};

export default RowTwo;
