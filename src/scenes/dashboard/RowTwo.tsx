/* eslint-disable @typescript-eslint/ban-types */
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Scatter,
	ScatterChart,
	Tooltip,
	XAxis,
	YAxis,
	ZAxis,
} from "recharts";
import FlexBetween from "@/components/FlexBetween";

// This is hard coded for pie charts -->
const pieData = [
	{
		name: "Quarter 1",
		value: 600,
	},
	{
		name: "Quarter 2",
		value: 400,
	},
];

const RowTwo = () => {
	const { palette } = useTheme();

	const pieColors = [palette.primary[800], palette.primary[300]];

	const { data: operationalData } = useGetKpisQuery();
	const { data: productData } = useGetProductsQuery();

	console.log("data from row 2 operationalData :: ", operationalData);
	console.log("data from row 2 productData :: ", productData);

	const operationalExpenses = useMemo(() => {
		return (
			operationalData &&
			operationalData[0].monthlyData.map(
				({ month, operationalExpenses, nonOperationalExpenses }) => {
					return {
						name: month.substring(0, 3),
						"Operational Expenses": operationalExpenses,
						"Non-Operational Expenses": nonOperationalExpenses,
					};
				}
			)
		);
	}, [operationalData]);

	const productExpenseData = useMemo(() => {
		return (
			productData &&
			productData.map(({ _id, price, expense }) => {
				return {
					id: _id,
					price: price,
					expense: expense,
				};
			})
		);
	}, [productData]);

	return (
		<>
			<DashboardBox gridArea="d">
				<BoxHeader
					title="Operational vs Non-Operational Expenses"
					sideText="+5.7%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={operationalExpenses}
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
							orientation="left"
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
							dataKey="Non-Operational Expenses"
							yAxisId="left"
							type="monotone"
							stroke={palette.tertiary[500]}
						/>
						<Line
							dataKey="Operational Expenses"
							yAxisId="right"
							type="monotone"
							stroke={palette.primary.main}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>

			<DashboardBox gridArea="e">
				<BoxHeader title="Quarter Targets" sideText="+2%" />
				<FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
					<PieChart
						width={110}
						height={100}
						margin={{
							top: 0,
							right: -10,
							left: 10,
							bottom: 0,
						}}
					>
						<Pie
							strokeOpacity="30%"
							dataKey="value"
							data={pieData}
							innerRadius={20}
							outerRadius={40}
							paddingAngle={5}
						>
							{pieData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={pieColors[index]}
								/>
							))}
						</Pie>
					</PieChart>
					<Box ml="-0.7rem" flexBasis="40%" textAlign="center">
						<Typography variant="h5">Target Sales</Typography>
						{/* This is also a hard coded value --> */}
						<Typography
							m="0.3rem 0"
							color={palette.primary[300]}
							variant="h3"
						>
							770
						</Typography>
						<Typography variant="h6">
							Financial Goals for Next Quarter
						</Typography>
					</Box>
					<Box flexBasis="40%">
						<Typography variant="h5">Loss in Revenue</Typography>
						<Typography variant="h6">
							Loss are down to : 25%
						</Typography>
						<Typography mt="0.4rem" variant="h5">
							Profit margin{" "}
						</Typography>
						<Typography variant="h6">
							Margins are up to : 35% from last month
						</Typography>
					</Box>
				</FlexBetween>
			</DashboardBox>

			<DashboardBox gridArea="f">
				<BoxHeader
					title="Product Prices vs Expenses"
					sideText="+4.0%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<ScatterChart
						margin={{
							top: 20,
							right: 25,
							bottom: 35,
							left: -10,
						}}
					>
						<CartesianGrid stroke={palette.grey[800]} />
						<XAxis
							type="number"
							dataKey="price"
							name="price"
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
							tickFormatter={(v) => `$${v}`}
						/>
						<YAxis
							type="number"
							dataKey="expense"
							name="expense"
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
							tickFormatter={(v) => `$${v}`}
						/>
						<ZAxis type="number" range={[20]} />
						<Tooltip formatter={(v) => `$${v}`} />
						<Scatter
							name="Product Expense Ratio"
							data={productExpenseData}
							fill={palette.tertiary[500]}
						/>
					</ScatterChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default RowTwo;
