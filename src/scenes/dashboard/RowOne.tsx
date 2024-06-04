/* eslint-disable @typescript-eslint/ban-types */
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
	ResponsiveContainer,
	AreaChart,
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	Line,
	Legend,
	LineChart,
	Rectangle,
} from "recharts";

const RowOne = () => {
	const { palette } = useTheme();
	const { data } = useGetKpisQuery();
	console.log("data form row 1: ", data);

	const revenueDataOnly = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue}) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					
				};
			})
		);
	}, [data]);

	const revenueExpenses = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue , expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					expenses: expenses,
				};
			})
		);
	}, [data]);

	const revenueProfit = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					profit: (revenue - expenses).toFixed(2),
				};
			})
		);
	}, [data]);

	return (
		<>
			<DashboardBox gridArea="a">
				<BoxHeader
					title="Revenue & Expenses"
					subtitle="These lies represents revenue and expenses"
					sideText="+4%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						width={500}
						height={400}
						data={revenueExpenses}
						margin={{
							top: 15,
							right: 25,
							left: -10,
							bottom: 60,
						}}
					>
						{/* <CartesianGrid strokeDasharray="3 3" /> */}
						<defs>
							<linearGradient
								id="colorRevenue"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="#45FD01"
									stopOpacity={0.5}
								/>
								<stop
									offset="95%"
									stopColor="#45FD01"
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient
								id="colorExpenses"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="#FD0003"
									stopOpacity={0.5}
								/>
								<stop
									offset="90%"
									stopColor="#FD0003"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							tickLine={false}
							axisLine={{ strokeWidth: "0" }}
							style={{ fontSize: "10px" }}
							domain={[8000, 23000]}
						/>
						<Tooltip />
						<Area
							dataKey="revenue"
							type="monotone"
							stroke="#45FD01"
							fillOpacity={1}
							fill="url(#colorRevenue)"
						/>
						<Area
							dataKey="expenses"
							type="monotone"
							stroke="#FD0003"
							fillOpacity={1}
							fill="url(#colorExpenses)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</DashboardBox>

			<DashboardBox gridArea="b">
				<BoxHeader
					title="Profit & Revenue"
					subtitle="These lies represents profit and revenue"
					sideText="+3.5%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						width={500}
						height={400}
						data={revenueProfit}
						margin={{
							top: 5,
							right: 0,
							left: -10,
							bottom: 55,
						}}
					>
						<CartesianGrid
							vertical={false}
							stroke={palette.grey[800]}
						/>

						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							yAxisId="left"
							tickLine={false}
							axisLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							tickLine={false}
							axisLine={false}
							style={{ fontSize: "10px" }}
						/>
						<Tooltip />
						<Legend
							height={20}
							wrapperStyle={{
								margin: "0 0 10px 0",
							}}
						/>
						<Line
							dataKey="profit"
							yAxisId="left"
							type="monotone"
							stroke={palette.tertiary[500]}
						/>
						<Line
							dataKey="revenue"
							yAxisId="right"
							type="monotone"
							stroke={palette.primary.main}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>

			<DashboardBox gridArea="c">
				<BoxHeader
					title="Revenue Month by Month"
					subtitle="Revenue in each month"
					sideText="+3.5%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={revenueDataOnly}
						margin={{
							top: 17,
							right: 15,
							left: -5,
							bottom: 58,
						}}
					>
						<defs>
							<linearGradient
								id="colorRevenueBar"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor={palette.primary[300]}
									stopOpacity={1}
								/>
								<stop
									offset="95%"
									stopColor={palette.primary[300]}
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							vertical={false}
							stroke={palette.grey[800]}
						/>
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<Tooltip />
						<Bar
							dataKey="revenue"
							fill="url(#colorRevenueBar)"
							activeBar={<Rectangle fill={palette.primary[300]} stroke="blue" />}
						/>
					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		
		</>
	);
};

export default RowOne;
