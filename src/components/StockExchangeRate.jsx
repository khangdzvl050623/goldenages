import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

function StockExchangeRate() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://goldenages-3.onrender.com/api/exchange-rate/current-exchange-rate")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (!data || data.length === 0) return <p>Không có dữ liệu</p>;

    // Chuyển dữ liệu API thành dạng phù hợp cho biểu đồ
    const chartData = data.map(item => ({
        name: item.currencyCode,
        buy: item.buyRate,
        transfer: item.transferRate,
        sell: item.sellRate
    }));

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                {/* Bảng dữ liệu */}
                <div className="col-md-4 bg-light p-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Mã tiền tệ</th>
                                <th>Tên tiền tệ</th>
                                <th>Giá mua</th>
                                <th>Chuyển khoản</th>
                                <th>Giá bán</th>
                                <th>Cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.currencyCode}</td>
                                    <td>{item.currencyName.trim()}</td>
                                    <td>{item.buyRate.toLocaleString()}</td>
                                    <td>{item.transferRate.toLocaleString()}</td>
                                    <td>{item.sellRate.toLocaleString()}</td>
                                    <td>{new Date(item.updatedTime).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Biểu đồ */}
                <div className="col-md-6 bg-white p-3" >
                    <h4>Biểu Đồ Tỷ Giá Ngoại Tệ</h4>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="buy" fill="#8884d8" name="Giá mua" />
                            <Bar dataKey="transfer" fill="#82ca9d" name="Chuyển khoản" />
                            <Bar dataKey="sell" fill="#ffc658" name="Giá bán" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default StockExchangeRate;
