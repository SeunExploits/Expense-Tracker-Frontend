import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import api from "../../libs/apiCall";
import { toast } from "sonner";
import Info from "../../components/ui/info";
import Stats from "../../components/ui/stats";
import Chart from "../../components/chart";
import DoughnutChart from "../../components/doughnutchart";


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardStats = async () => {
    const URL = "/transaction/dashboard";

    try {
      const {data} = await api.get(URL);

      setData(data);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Something unexpected happened. Try again later."
      );
      if (error?.response?.data?.status === "auth_failed") {
        localStorage.removeItem("user");
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDashboardStats();
  }, []);

  if (isLoading)
    return (
  <div className="flex items-center justify-center w-full h-[80vh]">
    <Loading/>
  </div>
    )

  return <div className="px-0 md:px-5 2xl:px-20">
    <Info title= "Dashboard" subTitle={"Monitor your financial activities"} />
    <Stats
    dt={{
      balance: data?.availableBalance,
      income: data?.totalIncome,
      expense: data?.totalExpense,
    }}
    />


     <div className="">
      <Chart data={data?.chartData} />
      {data?.totalIncome > 0 && (
        <DoughnutChart
    dt={{
      balance: data?.availableBalance,
      income: data?.totalIncome,
      expense: data?.totalExpense,
       }}
        />
         )}
    </div>
  </div>

};

export default Dashboard;
