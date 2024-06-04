/* eslint-disable @typescript-eslint/ban-types */
import DashboardBox from "@/components/DashboardBox";
import { useGetProductsQuery } from "@/state/api";

type Props = {};

const RowTwo = (props: Props) => {

	const {data} = useGetProductsQuery();
	console.log("data from row 2:: ", data);
	

	return (
		<>
			<DashboardBox gridArea="d" />
			<DashboardBox gridArea="e" />
			<DashboardBox gridArea="f" />
		</>
	);
};

export default RowTwo;
